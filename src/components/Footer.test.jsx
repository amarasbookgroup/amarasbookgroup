import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../test/renderWithRouter.jsx";
import Footer from "./Footer.jsx";

describe("<Footer />", () => {
  it("renders the brand name and copyright with the current year", () => {
    renderWithRouter(<Footer />);
    expect(screen.getAllByText(/Amaras Book Group/).length).toBeGreaterThan(0);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("links to every primary route", () => {
    renderWithRouter(<Footer />);
    const hrefs = Array.from(
      document.querySelectorAll("a[href]")
    ).map((a) => a.getAttribute("href"));
    for (const href of ["/", "/shop", "/pronunciation", "/contact"]) {
      expect(hrefs).toContain(href);
    }
  });
});
