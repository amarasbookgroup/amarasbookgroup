import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../test/renderWithRouter.jsx";
import Shop from "./Shop.jsx";
import { books } from "../data/books.js";

describe("<Shop />", () => {
  it("renders one card per book", () => {
    renderWithRouter(<Shop />);
    for (const book of books) {
      const link = screen.getByRole("link", {
        name: new RegExp(book.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      });
      expect(link).toHaveAttribute("href", `/shop/${book.slug}`);
    }
  });

  it("renders the page heading", () => {
    renderWithRouter(<Shop />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Books for little/i })
    ).toBeInTheDocument();
  });
});
