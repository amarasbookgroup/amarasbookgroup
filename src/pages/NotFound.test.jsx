import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../test/renderWithRouter.jsx";
import NotFound from "./NotFound.jsx";

describe("<NotFound />", () => {
  it("renders the 404 marker and friendly heading", () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /lion wandered off/i })
    ).toBeInTheDocument();
  });

  it("links back home and to the shop", () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByRole("link", { name: /Back to home/i })
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: /Visit the shop/i })
    ).toHaveAttribute("href", "/shop");
  });
});
