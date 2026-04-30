// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import {
  buildMetaBlock,
  escapeAttr,
  main,
  META_END,
  META_START,
  replaceBlock,
  replaceDescription,
  replaceTitle,
  routes,
} from "./prerender.mjs";
import { books } from "../src/data/books.js";

// A synthetic SPA shell that mirrors index.html structure: a generic <title>,
// a default description meta, and the OG marker block the prerender swaps.
const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="default description" />
    <title>Default Title</title>
    ${META_START}
    <meta property="og:type" content="website" />
    ${META_END}
  </head>
  <body><div id="root"></div></body>
</html>`;

describe("prerender helpers", () => {
  it("escapeAttr escapes XML/HTML metacharacters", () => {
    expect(escapeAttr(`a & b "c" <d>`)).toBe(
      "a &amp; b &quot;c&quot; &lt;d&gt;"
    );
  });

  it("buildMetaBlock embeds title, description, image and url", () => {
    const block = buildMetaBlock({
      title: "T",
      description: "D",
      image: "https://example.com/og.jpg",
      url: "https://example.com/x",
    });
    expect(block).toContain(META_START);
    expect(block).toContain(META_END);
    expect(block).toContain('content="T"');
    expect(block).toContain('content="D"');
    expect(block).toContain('content="https://example.com/og.jpg"');
    expect(block).toContain('content="https://example.com/x"');
  });

  it("replaceBlock swaps the marker region without touching the rest", () => {
    const out = replaceBlock(SHELL, `${META_START}NEW${META_END}`);
    expect(out).toContain(`${META_START}NEW${META_END}`);
    expect(out).toContain("<title>Default Title</title>");
  });

  it("replaceBlock throws when markers are missing", () => {
    expect(() => replaceBlock("<html></html>", "x")).toThrow();
  });

  it("replaceTitle rewrites the <title> tag", () => {
    expect(replaceTitle(SHELL, "Hello")).toContain("<title>Hello</title>");
  });

  it("replaceDescription rewrites an existing meta description", () => {
    expect(replaceDescription(SHELL, "new desc")).toContain(
      'content="new desc"'
    );
  });

  it("replaceDescription inserts a meta when none exists", () => {
    const minimal = `<html><head><title>T</title></head></html>`;
    const out = replaceDescription(minimal, "fresh");
    expect(out).toMatch(/<title>T<\/title>\s*<meta name="description" content="fresh"/);
  });
});

describe("prerender main()", () => {
  let dist;

  beforeEach(async () => {
    dist = await mkdtemp(resolve(tmpdir(), "abg-prerender-"));
    await writeFile(resolve(dist, "index.html"), SHELL, "utf8");
  });

  afterEach(async () => {
    await rm(dist, { recursive: true, force: true });
  });

  it("emits one HTML file per route with route-specific meta", async () => {
    const result = await main({
      dist,
      siteUrl: "https://test.example",
      log: () => {},
    });

    expect(result.count).toBe(routes.length);

    for (const route of routes) {
      const outPath =
        route.path === "/"
          ? resolve(dist, "index.html")
          : resolve(dist, route.path.replace(/^\//, ""), "index.html");

      const html = await readFile(outPath, "utf8");
      expect(html).toContain(`<title>${route.title}</title>`);
      expect(html).toContain(`content="${escapeAttr(route.description)}"`);
      expect(html).toContain(
        `content="https://test.example${route.image}"`
      );
      expect(html).toContain(
        `content="https://test.example${route.path === "/" ? "/" : route.path}"`
      );
    }
  });

  it("emits a per-book PDP file with a book-specific og:image", async () => {
    await main({
      dist,
      siteUrl: "https://test.example",
      log: () => {},
    });

    for (const book of books) {
      const html = await readFile(
        resolve(dist, "shop", book.slug, "index.html"),
        "utf8"
      );
      expect(html).toContain(`og-${book.slug}.jpg`);
      expect(html).toContain(book.title);
    }
  });

  it("trims a trailing slash from siteUrl-equivalent inputs (already done in env layer)", async () => {
    // The script normalizes process.env.URL with a trailing-slash strip when it
    // builds DEFAULT_SITE_URL; the explicit `siteUrl` arg is passed through
    // verbatim. This test pins the behavior so a future refactor that adds
    // double slashes will fail loudly.
    await main({
      dist,
      siteUrl: "https://test.example",
      log: () => {},
    });
    const html = await readFile(resolve(dist, "index.html"), "utf8");
    expect(html).not.toMatch(/https:\/\/test\.example\/\//);
  });

  it("throws if the input shell is missing the OG markers", async () => {
    await rm(resolve(dist, "index.html"));
    await mkdir(dist, { recursive: true });
    await writeFile(
      resolve(dist, "index.html"),
      `<html><head><title>x</title></head></html>`,
      "utf8"
    );
    await expect(
      main({ dist, siteUrl: "https://test.example", log: () => {} })
    ).rejects.toThrow(/OG_META markers/);
  });
});
