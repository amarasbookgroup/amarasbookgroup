import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../test/renderWithRouter.jsx";
import BookDetail from "./BookDetail.jsx";
import { books } from "../data/books.js";

describe("<BookDetail />", () => {
  const book = books[0];

  it("renders the book at a known slug", () => {
    renderWithRouter(<BookDetail />, {
      route: `/shop/${book.slug}`,
      routePath: "/shop/:slug",
    });
    expect(
      screen.getByRole("heading", { level: 1, name: book.title })
    ).toBeInTheDocument();
    expect(screen.getByText(book.tagline)).toBeInTheDocument();
    expect(screen.getByText(book.price)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Buy on Amazon/i })
    ).toHaveAttribute("href", book.amazonUrl);
  });

  it("renders every highlight bullet", () => {
    renderWithRouter(<BookDetail />, {
      route: `/shop/${book.slug}`,
      routePath: "/shop/:slug",
    });
    for (const h of book.highlights) {
      expect(screen.getByText(h)).toBeInTheDocument();
    }
  });

  it("shows a not-found fallback for an unknown slug", () => {
    renderWithRouter(<BookDetail />, {
      route: "/shop/__bogus__",
      routePath: "/shop/:slug",
    });
    expect(
      screen.getByRole("heading", { level: 1, name: /Book not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to shop/i })
    ).toHaveAttribute("href", "/shop");
  });
});
