import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../test/renderWithRouter.jsx";
import Pronunciation from "./Pronunciation.jsx";
import { alphabet } from "../data/alphabet.js";

const STORAGE_KEY = "amaras-mastered-letters";

describe("<Pronunciation />", () => {
  beforeEach(() => {
    window.localStorage.removeItem(STORAGE_KEY);
  });
  afterEach(() => {
    window.localStorage.removeItem(STORAGE_KEY);
  });

  it("renders the page heading and intro count", () => {
    renderWithRouter(<Pronunciation />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Armenian alphabet/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/39 letters/)).toBeInTheDocument();
  });

  it("renders the full Western Armenian alphabet (39 letters)", () => {
    renderWithRouter(<Pronunciation />);
    expect(alphabet.length).toBe(39);
    for (const letter of alphabet) {
      expect(screen.getAllByText(letter.capital).length).toBeGreaterThan(0);
    }
  });

  it("disables Reset progress when nothing is mastered", () => {
    renderWithRouter(<Pronunciation />);
    const reset = screen.getByRole("button", { name: /Reset learned letters/i });
    expect(reset).toBeDisabled();
  });
});
