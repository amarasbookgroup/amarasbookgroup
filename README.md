# Amara's Book Group

Marketing and storefront site for Amara's Book Group, an Armenian children's book publisher.

Built with Vite + React + React Router + Tailwind CSS. Deployed as a static site on Netlify.

## Pages

- **Home** (`/`) — hero, mascot intro, featured book, alphabet teaser
- **Shop** (`/shop`) — book grid
- **Book PDP** (`/shop/:slug`) — book details with a "Buy on Amazon" CTA
- **Pronunciation Help** (`/pronunciation`) — full Armenian alphabet (39 letters)
- **Contact** (`/contact`) — Netlify Forms-powered contact form

## Local development

Requires Node 20.19+ or 22.12+ (Vite 7).

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:5173.

## Production build

```bash
npm run build
npm run preview
```

Output is written to `dist/`.

## Testing

The repo ships with a three-layer test suite:

| Layer | Tool | Command | What it covers |
| --- | --- | --- | --- |
| Unit + component | Vitest + React Testing Library | `npm test` | Data helpers, every page renders, route-level interactions, the prerender + OG-card script logic |
| End-to-end | Playwright (system Chrome) | `npm run test:e2e` | A real production build is served via `vite preview` and every prerendered route is hit; navigation flows are clicked through |
| Visual regression | Playwright screenshots | `npm run test:visual` | Full-page screenshots of every route diffed against committed Linux baselines (see [e2e/README.md](e2e/README.md)) |

Run them locally with:

```bash
npm test            # ~3s, no browser required
npm run test:e2e    # ~30s, needs Google Chrome installed (or run npx playwright install chromium first)
npm run test:visual # only after baselines have been generated via npm run test:visual:update
```

`test:e2e` deliberately excludes the visual specs so it always passes on a
fresh clone. Visual baselines must be generated explicitly (and from a Linux
container so they match CI byte-for-byte) via `npm run test:visual:update`.

CI runs both via [.github/workflows/test.yml](.github/workflows/test.yml). The
build step on Netlify intentionally does **not** run tests so deploy minutes
aren't consumed.

## Deploy on Netlify

1. Push this repo to GitHub.
2. In Netlify, "Add new site" → "Import an existing project" → pick this repo.
3. Build command and publish directory are read automatically from `netlify.toml`:
   - Build: `npm run build`
   - Publish: `dist`
4. Netlify Forms will pick up the hidden `contact` form in `index.html` on the first deploy. Submissions appear in the Netlify dashboard under "Forms".

## Replacing placeholder assets

- `public/images/book-cover.jpg` — replace with the real "My Hye Book" cover.
- `src/data/books.js` — update the book metadata, price, and Amazon URL as needed.
- `src/data/alphabet.js` — drop audio file paths into the `audio` field of each letter when ready (`/audio/<letter>.mp3`); the Listen buttons will activate automatically.

## Social share previews (Open Graph)

Each route gets its own pre-rendered HTML with route-specific Open Graph and Twitter card tags so links unfurl with proper previews on Facebook, Twitter/X, iMessage, Slack, etc.

- The **default** share image is the lion mascot card at `public/og/og-default.jpg`.
- Each **PDP** uses its own card at `public/og/og-<slug>.jpg`.
- The **Shop** page reuses the latest book's card (currently `books[0]` in [src/data/books.js](src/data/books.js); newest entries should be unshifted to the top of the array).

### When to re-generate the share cards

Run this whenever the mascot, the books data, or any cover image changes:

```bash
npm run generate-og
```

This regenerates every `public/og/og-*.jpg` from the SVG layouts in [scripts/generate-og.mjs](scripts/generate-og.mjs). Commit the resulting JPGs.

### How prerendering works

`npm run build` runs `vite build` and then [scripts/prerender.mjs](scripts/prerender.mjs), which writes one `dist/<route>/index.html` per route with the route-specific meta tags swapped in between the `<!-- OG_META_START -->` / `<!-- OG_META_END -->` markers in [index.html](index.html). The site URL comes from `process.env.URL` (auto-injected by Netlify on every deploy, including custom domains). Locally it falls back to `https://amarasbookgroup.netlify.app`.

### Verifying after deploy

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Quick local check:

  ```bash
  curl -s https://amarasbookgroup.netlify.app/shop/my-hye-book | grep -E 'og:(title|image|url)'
  ```

## Future: direct checkout

The "Buy on Amazon" button in `src/pages/BookDetail.jsx` is the seam where Stripe Checkout (via a Netlify Function at `/.netlify/functions/create-checkout`) will plug in.
