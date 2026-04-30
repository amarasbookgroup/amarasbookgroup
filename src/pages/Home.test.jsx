import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../test/renderWithRouter.jsx";
import Home from "./Home.jsx";
import { books } from "../data/books.js";

describe("<Home />", () => {
  it("renders the hero heading and primary CTAs", () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Armenian stories for/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Shop the book/i })).toHaveAttribute(
      "href",
      "/shop"
    );
    expect(
      screen.getByRole("link", { name: /Learn the alphabet/i })
    ).toHaveAttribute("href", "/pronunciation");
  });

  it("features the first book", () => {
    renderWithRouter(<Home />);
    const featured = books[0];
    expect(
      screen.getAllByRole("heading", { name: featured.title }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /See the book/i })
    ).toHaveAttribute("href", `/shop/${featured.slug}`);
  });

  it("links to the contact page from the closing CTA", () => {
    renderWithRouter(<Home />);
    const contactLinks = screen
      .getAllByRole("link", { name: /Contact us/i })
      .map((a) => a.getAttribute("href"));
    expect(contactLinks).toContain("/contact");
  });
});
