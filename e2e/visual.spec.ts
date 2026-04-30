import { test, expect, Page } from "@playwright/test";

// Routes that get a full-page snapshot. The shop PDP is exercised separately
// because we discover its slug at runtime to keep the spec data-driven.
const ROUTES = [
  { path: "/", name: "home" },
  { path: "/shop", name: "shop" },
  { path: "/pronunciation", name: "pronunciation" },
  { path: "/contact", name: "contact" },
  { path: "/__definitely-not-a-real-route__", name: "not-found" },
];

// Block external font requests so the page renders with the system fallbacks
// declared in tailwind theme tokens (`ui-serif` / `ui-sans-serif`). This makes
// snapshots deterministic across machines that may have different cached
// versions of the Google fonts. See e2e/README.md for the longevity story.
async function blockExternalFonts(page: Page) {
  await page.route(/(fonts\.googleapis\.com|fonts\.gstatic\.com)/, (route) =>
    route.abort()
  );
}

async function settle(page: Page) {
  await page.evaluate(() => document.fonts?.ready);
  // Disable any CSS animations / transitions so visual diffs are stable.
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation: none !important;
      transition: none !important;
      caret-color: transparent !important;
    }`,
  });
}

for (const route of ROUTES) {
  test(`visual: ${route.name}`, async ({ page }) => {
    await blockExternalFonts(page);
    await page.goto(route.path);
    await settle(page);
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}

test("visual: book detail", async ({ page }) => {
  await blockExternalFonts(page);
  await page.goto("/shop");
  const firstHref = await page
    .locator("a[href^='/shop/']")
    .first()
    .getAttribute("href");
  expect(firstHref).toBeTruthy();
  await page.goto(firstHref!);
  await settle(page);
  await expect(page).toHaveScreenshot("book-detail.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
