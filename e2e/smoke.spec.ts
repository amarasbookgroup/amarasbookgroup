import { test, expect } from "@playwright/test";

// These match what scripts/prerender.mjs emits. Each route should respond 200
// with the prerendered title and a route-specific OG image.
const ROUTES = [
  {
    path: "/",
    title: "Amara's Book Group | Armenian Children's Books",
    ogImageSuffix: "/og/og-default.jpg",
  },
  {
    path: "/shop",
    title: "Shop | Amara's Book Group",
    ogImageSuffix: "/og/og-my-hye-book.jpg",
  },
  {
    path: "/shop/my-hye-book",
    title: "My Hye Book Series: Animals | Amara's Book Group",
    ogImageSuffix: "/og/og-my-hye-book.jpg",
  },
  {
    path: "/pronunciation",
    title: "Pronunciation Help | Amara's Book Group",
    ogImageSuffix: "/og/og-default.jpg",
  },
  {
    path: "/contact",
    title: "Contact | Amara's Book Group",
    ogImageSuffix: "/og/og-default.jpg",
  },
];

for (const route of ROUTES) {
  test(`prerendered: ${route.path}`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status(), "route responded").toBeLessThan(400);
    await expect(page).toHaveTitle(route.title);
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).not.toBeNull();
    expect(ogImage!).toContain(route.ogImageSuffix);
  });
}

test("404 page renders the SPA fallback", async ({ page }) => {
  // Netlify's SPA redirect serves /index.html with status 200 — the React
  // router then renders the NotFound page client-side.
  await page.goto("/__definitely-not-a-real-route__");
  await expect(page.getByText("404")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: /lion wandered off/i })
  ).toBeVisible();
});

test("contact form is wired to Netlify", async ({ page }) => {
  await page.goto("/contact");
  const form = page.locator("form[name='contact']").first();
  await expect(form).toHaveAttribute("data-netlify", "true");
  await expect(form).toHaveAttribute("method", "POST");
  await expect(form).toHaveAttribute("action", "/contact?success=true");
});

test("contact success banner renders when ?success=true", async ({ page }) => {
  await page.goto("/contact?success=true");
  await expect(
    page.getByText(/Thanks! Your message is on its way/i)
  ).toBeVisible();
});
