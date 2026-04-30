// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  appleTouchIconSvg,
  bookCardSvg,
  defaultCardSvg,
  escapeXml,
  faviconSvg,
} from "./generate-og.mjs";
import { books } from "../src/data/books.js";

describe("generate-og helpers", () => {
  it("escapeXml escapes the five entity characters", () => {
    expect(escapeXml(`a & b "c" 'd' <e>`)).toBe(
      "a &amp; b &quot;c&quot; &apos;d&apos; &lt;e&gt;"
    );
  });

  it("defaultCardSvg returns a 1200x630 SVG with brand text", () => {
    const svg = defaultCardSvg();
    expect(svg).toMatch(/^<svg/);
    expect(svg).toContain('width="1200"');
    expect(svg).toContain('height="630"');
    expect(svg).toContain("Amara"); // the apostrophe is XML-escaped
    expect(svg).toContain("Book Group");
  });

  it("bookCardSvg embeds the book's title and price", () => {
    const book = books[0];
    const svg = bookCardSvg(book, "data:image/jpeg;base64,AAA");
    expect(svg).toMatch(/^<svg/);
    expect(svg).toContain(book.price);
    expect(svg).toContain(book.ageRange);
    expect(svg).toContain("data:image/jpeg;base64,AAA");
    // First word of the title should make it through the wrapper.
    const firstTitleWord = book.title.split(/\s+/)[0];
    expect(svg).toContain(firstTitleWord);
  });

  it("appleTouchIconSvg is a 180x180 square with the apricot background", () => {
    const svg = appleTouchIconSvg();
    expect(svg).toContain('width="180"');
    expect(svg).toContain('height="180"');
    expect(svg.toLowerCase()).toContain("#f2a800");
  });

  it("faviconSvg is a 64x64 viewBox with no opaque background fill", () => {
    const svg = faviconSvg();
    expect(svg).toContain('viewBox="0 0 64 64"');
    // No background <rect width=64 height=64 fill="..."> — the lion is rendered
    // straight onto whatever the host UI's tab color is.
    expect(svg).not.toMatch(/<rect[^>]*width="64"[^>]*height="64"[^>]*fill=/);
  });
});
