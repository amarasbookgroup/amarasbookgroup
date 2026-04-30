# End-to-end tests

Two kinds of tests live here:

- `smoke.spec.ts` and `navigation.spec.ts` — functional checks that boot the
  production build via `vite preview`, hit every prerendered route, and click
  through the SPA.
- `visual.spec.ts` — full-page screenshot diffs of every route, used to catch
  unintentional CSS regressions.

- `npm run test:e2e` — runs the functional specs only (`smoke.spec.ts` +
  `navigation.spec.ts`). Always passes on a clean clone.
- `npm run test:visual` — runs the visual specs only. Requires baselines
  to exist (see "Visual snapshots" below). Will fail the first time you run
  it locally because the snapshot files have not been committed yet — that
  is intentional.
- `npm run test:visual:update` — regenerates the Linux baselines via the
  Playwright Docker image so they match what CI will diff against.

## One-time setup

The Playwright config uses your **system Chrome** (`channel: "chrome"`) so the
multi-hundred-megabyte Chromium download is not required. On macOS this means
you need `Google Chrome.app` installed. On CI we install Chrome via the
official setup action.

If you want the bundled Playwright Chromium instead (for hermetic local runs),
set `channel` to `undefined` in `playwright.config.ts` and run:

```sh
npx playwright install chromium
```

## Visual snapshots are platform-sensitive

Font rendering, sub-pixel antialiasing, and image decoding all differ between
macOS and Linux. The committed `*.png` baselines in this directory were
generated **inside a Linux Playwright container** so they match what CI sees.

If you make a UI change that should update the snapshots, regenerate them in
the same container:

```sh
npm run test:visual:update
```

Under the hood that runs:

```sh
docker run --rm -v "$PWD:/work" -w /work \
  mcr.microsoft.com/playwright:v1.56.0-jammy \
  bash -c "npm ci && npx playwright test --update-snapshots e2e/visual.spec.ts"
```

Update the `mcr.microsoft.com/playwright` tag whenever you bump
`@playwright/test` so the host browser version matches.

## Why we block Google Fonts during visual tests

The site loads Fraunces/Nunito from `fonts.googleapis.com` at runtime. To make
visual snapshots deterministic the spec aborts those requests so the page
renders with the `ui-serif` / `ui-sans-serif` fallbacks declared in the
Tailwind theme. The visual diff therefore catches *layout* regressions, not
font-rendering noise.

If you ever switch to bundling the brand fonts locally (a longevity win —
removes the Google Fonts runtime dependency), drop the `route.abort()` calls
in `visual.spec.ts` and regenerate the snapshots once.
