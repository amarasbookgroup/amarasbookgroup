// Post-build prerender step: takes the SPA shell at dist/index.html and
// emits one HTML file per route with route-specific OG / Twitter meta tags
// swapped in. Netlify serves these static files first, so social crawlers
// get the right preview without the SPA needing to be JS-rendered.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { books } from "../src/data/books.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

// Netlify exposes the deploy URL via the URL env var (works for previews
// and production, including custom domains once configured).
const SITE_URL = (process.env.URL || "https://amarasbookgroup.netlify.app").replace(/\/$/, "");

const SHARED = {
  siteName: "Amara's Book Group",
};

// Route map. PDPs are derived from the books data so adding a new book
// automatically gets a prerendered page on the next build.
const routes = [
  {
    path: "/",
    title: "Amara's Book Group | Armenian Children's Books",
    description:
      "Bright Armenian children's books supporting Western Armenian language revival.",
    image: "/og/og-default.jpg",
  },
  {
    path: "/shop",
    title: "Shop | Amara's Book Group",
    description: "Books to spark a lifelong love of Armenian.",
    // The latest book is books[0] by convention (newest unshifted to the top).
    image: `/og/og-${books[0].slug}.jpg`,
  },
  ...books.map((book) => ({
    path: `/shop/${book.slug}`,
    title: `${book.title} | Amara's Book Group`,
    description: book.tagline,
    image: `/og/og-${book.slug}.jpg`,
  })),
  {
    path: "/pronunciation",
    title: "Pronunciation Help | Amara's Book Group",
    description: "Learn the Armenian alphabet, letter by letter.",
    image: "/og/og-default.jpg",
  },
  {
    path: "/contact",
    title: "Contact | Amara's Book Group",
    description:
      "Say barev. Questions, suggestions, and book wait lists welcome.",
    image: "/og/og-default.jpg",
  },
];

const META_START = "<!-- OG_META_START -->";
const META_END = "<!-- OG_META_END -->";

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildMetaBlock({ title, description, image, url }) {
  const e = escapeAttr;
  return [
    META_START,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="${e(SHARED.siteName)}" />`,
    `    <meta property="og:title" content="${e(title)}" />`,
    `    <meta property="og:description" content="${e(description)}" />`,
    `    <meta property="og:image" content="${e(image)}" />`,
    `    <meta property="og:url" content="${e(url)}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${e(title)}" />`,
    `    <meta name="twitter:description" content="${e(description)}" />`,
    `    <meta name="twitter:image" content="${e(image)}" />`,
    `    ${META_END}`,
  ].join("\n    ");
}

function replaceBlock(html, newBlock) {
  const startIdx = html.indexOf(META_START);
  const endIdx = html.indexOf(META_END);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(
      `Could not find ${META_START} / ${META_END} markers in dist/index.html`
    );
  }
  return (
    html.slice(0, startIdx) +
    newBlock +
    html.slice(endIdx + META_END.length)
  );
}

function replaceTitle(html, title) {
  return html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${title.replace(/</g, "&lt;")}</title>`
  );
}

function replaceDescription(html, description) {
  const meta = `<meta name="description" content="${escapeAttr(description)}" />`;
  if (/<meta name="description"[^>]*>/.test(html)) {
    return html.replace(/<meta name="description"[^>]*>/, meta);
  }
  return html.replace("</title>", `</title>\n    ${meta}`);
}

async function main() {
  const shellPath = resolve(DIST, "index.html");
  const shell = await readFile(shellPath, "utf8");

  if (!shell.includes(META_START) || !shell.includes(META_END)) {
    throw new Error(
      `index.html is missing OG_META markers. Add ${META_START} ... ${META_END} around the meta tag block.`
    );
  }

  let count = 0;
  for (const route of routes) {
    const url = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
    const absoluteImage = route.image.startsWith("http")
      ? route.image
      : `${SITE_URL}${route.image}`;

    const block = buildMetaBlock({
      title: route.title,
      description: route.description,
      image: absoluteImage,
      url,
    });

    let html = replaceBlock(shell, block);
    html = replaceTitle(html, route.title);
    html = replaceDescription(html, route.description);

    const outPath =
      route.path === "/"
        ? resolve(DIST, "index.html")
        : resolve(DIST, route.path.replace(/^\//, ""), "index.html");

    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    count += 1;
    console.log(`  prerendered ${route.path} -> ${outPath.replace(ROOT + "/", "")}`);
  }

  console.log(`\nPrerendered ${count} route(s) using SITE_URL=${SITE_URL}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
