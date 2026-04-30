import { describe, expect, it } from "vitest";
import { books, findBook } from "./books.js";

describe("books data", () => {
  it("exposes a non-empty catalog", () => {
    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0);
  });

  it.each(books)(
    "book '$slug' has every field the prerender + OG scripts rely on",
    (book) => {
      expect(book.slug).toMatch(/^[a-z0-9-]+$/);
      expect(book.title).toBeTruthy();
      expect(book.tagline).toBeTruthy();
      expect(book.cover).toMatch(/^\//);
      expect(book.price).toMatch(/^\$\d/);
      expect(book.ageRange).toBeTruthy();
      expect(Array.isArray(book.images)).toBe(true);
      expect(Array.isArray(book.highlights)).toBe(true);
      expect(Array.isArray(book.details)).toBe(true);
    }
  );

  it("slugs are unique", () => {
    const slugs = books.map((b) => b.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("findBook", () => {
  it("returns the matching book for a known slug", () => {
    const known = books[0];
    expect(findBook(known.slug)).toBe(known);
  });

  it("returns undefined for an unknown slug", () => {
    expect(findBook("__definitely-not-a-real-slug__")).toBeUndefined();
  });

  it("returns undefined for falsy input", () => {
    expect(findBook(undefined)).toBeUndefined();
    expect(findBook("")).toBeUndefined();
  });
});
