import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../test/renderWithRouter.jsx";
import BookCard from "./BookCard.jsx";
import { books } from "../data/books.js";

describe("<BookCard />", () => {
  const book = books[0];

  it("renders the title, age range, and price", () => {
    renderWithRouter(<BookCard book={book} />);
    expect(
      screen.getByRole("heading", { level: 3, name: book.title })
    ).toBeInTheDocument();
    expect(screen.getByText(book.ageRange)).toBeInTheDocument();
    expect(screen.getByText(book.price)).toBeInTheDocument();
  });

  it("links to the book's PDP", () => {
    renderWithRouter(<BookCard book={book} />);
    const link = screen.getByRole("link", { name: new RegExp(book.title) });
    expect(link).toHaveAttribute("href", `/shop/${book.slug}`);
  });

  it("renders the cover image with a descriptive alt", () => {
    renderWithRouter(<BookCard book={book} />);
    const img = screen.getByRole("img", { name: `Cover of ${book.title}` });
    expect(img).toHaveAttribute("src", book.cover);
  });
});
