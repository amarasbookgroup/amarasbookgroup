import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../test/renderWithRouter.jsx";
import Contact from "./Contact.jsx";

describe("<Contact />", () => {
  it("renders the heading and the contact form fields", () => {
    renderWithRouter(<Contact />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Say parev/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send message/i })).toBeInTheDocument();
  });

  it("does not show the success banner without ?success=true", () => {
    renderWithRouter(<Contact />);
    expect(
      screen.queryByText(/Thanks! Your message is on its way/i)
    ).not.toBeInTheDocument();
  });

  it("shows the success banner when ?success=true is present", () => {
    renderWithRouter(<Contact />, { route: "/contact?success=true" });
    expect(
      screen.getByText(/Thanks! Your message is on its way/i)
    ).toBeInTheDocument();
  });

  it("posts the form to the netlify success URL", () => {
    renderWithRouter(<Contact />);
    const form = document.querySelector("form[name='contact']");
    expect(form).toHaveAttribute("action", "/contact?success=true");
    expect(form).toHaveAttribute("method", "POST");
    expect(form).toHaveAttribute("data-netlify", "true");
  });
});
