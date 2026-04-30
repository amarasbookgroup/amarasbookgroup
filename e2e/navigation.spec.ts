import { test, expect } from "@playwright/test";

test("home -> shop -> book detail -> back via header nav", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Armenian stories for/i })
  ).toBeVisible();

  await page.getByRole("link", { name: "Shop", exact: true }).first().click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Books for little/i })
  ).toBeVisible();

  // Pick the first book card link.
  await page.locator("a[href^='/shop/']").first().click();
  await expect(page).toHaveURL(/\/shop\/[a-z0-9-]+$/);
  await expect(page.getByRole("link", { name: /Buy on Amazon/i })).toBeVisible();

  await page.getByRole("link", { name: "Home" }).first().click();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Armenian stories for/i })
  ).toBeVisible();
});

test("pronunciation page renders the alphabet", async ({ page }) => {
  await page.goto("/pronunciation");
  // 39 letter cards — each card exposes the capital character.
  const capitals = page.locator("text=Ա");
  await expect(capitals.first()).toBeVisible();
  // Reset progress button is disabled at start.
  await expect(
    page.getByRole("button", { name: /Reset learned letters/i })
  ).toBeDisabled();
});
