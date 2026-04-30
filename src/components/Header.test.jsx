import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "./Header.jsx";

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );
}

describe("<Header />", () => {
  it("renders the brand link and every nav entry", () => {
    renderAt("/");
    expect(screen.getAllByText("Amaras Book Group").length).toBeGreaterThan(0);
    for (const label of ["Home", "Shop", "Pronunciation Help", "Contact"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(
        0
      );
    }
  });

  it("marks Home active on '/'", () => {
    renderAt("/");
    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("aria-current", "page");
    const shop = screen.getByRole("link", { name: "Shop" });
    expect(shop).not.toHaveAttribute("aria-current", "page");
  });

  it("marks Shop active on '/shop'", () => {
    renderAt("/shop");
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("marks Shop active on a PDP route", () => {
    renderAt("/shop/my-hye-book");
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("exposes the current pathname for debugging", () => {
    renderAt("/contact");
    const marker = document.querySelector("[data-current-path]");
    expect(marker).toHaveAttribute("data-current-path", "/contact");
  });
});
