// Generates 1200x630 social share cards (Open Graph / Twitter) by hand-
// authoring SVGs and rasterizing them to JPG with sharp. Run manually
// whenever book data, covers, or the mascot change:
//
//   npm run generate-og
//
// Output: public/og/og-default.jpg + one public/og/og-<slug>.jpg per book.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { books } from "../src/data/books.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");
const OUT = resolve(PUBLIC, "og");

const W = 1200;
const H = 630;

const COLORS = {
  cream: "#FFF8EC",
  ink: "#1B1B2F",
  red: "#D90012",
  blue: "#0033A0",
  apricot: "#F2A800",
  inkSoft: "rgba(27,27,47,0.7)",
};

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Lion mascot, sized for share-card use. Mirrors the in-app SVG but scaled
// so it reads well at 1200x630.
function lionSvg({ x = 0, y = 0, size = 380 } = {}) {
  const cx = x + size / 2;
  const cy = y + size / 2;
  const tufts = [];
  const tuftCount = 14;
  const tuftR = size * 0.11;
  const ringR = size * 0.36;
  for (let i = 0; i < tuftCount; i++) {
    const a = (i / tuftCount) * Math.PI * 2;
    const tx = cx + Math.cos(a) * ringR;
    const ty = cy + Math.sin(a) * ringR;
    tufts.push(
      `<circle cx="${tx}" cy="${ty}" r="${tuftR}" fill="url(#mane)" stroke="#A85A00" stroke-width="${size * 0.012}"/>`
    );
  }
  const eyeR = size * 0.035;
  const earR = size * 0.07;
  const innerEar = size * 0.035;
  const earOff = size * 0.21;
  const eyeOff = size * 0.1;
  const eyeY = cy - size * 0.04;
  const noseY = cy + size * 0.08;
  const mouthY = cy + size * 0.16;

  return `
    <g>
      ${tufts.join("\n      ")}
      <circle cx="${cx}" cy="${cy}" r="${size * 0.4}" fill="url(#mane)" />
      <circle cx="${cx - earOff}" cy="${cy - earOff}" r="${earR}" fill="#D17400" />
      <circle cx="${cx + earOff}" cy="${cy - earOff}" r="${earR}" fill="#D17400" />
      <circle cx="${cx - earOff}" cy="${cy - earOff}" r="${innerEar}" fill="#FFB6A0" />
      <circle cx="${cx + earOff}" cy="${cy - earOff}" r="${innerEar}" fill="#FFB6A0" />
      <ellipse cx="${cx}" cy="${cy + size * 0.03}" rx="${size * 0.29}" ry="${size * 0.28}" fill="url(#face)" />
      <circle cx="${cx - size * 0.15}" cy="${cy + size * 0.07}" r="${size * 0.045}" fill="#FFB6A0" opacity="0.7" />
      <circle cx="${cx + size * 0.15}" cy="${cy + size * 0.07}" r="${size * 0.045}" fill="#FFB6A0" opacity="0.7" />
      <ellipse cx="${cx - eyeOff}" cy="${eyeY}" rx="${eyeR}" ry="${eyeR * 1.15}" fill="${COLORS.ink}" />
      <ellipse cx="${cx + eyeOff}" cy="${eyeY}" rx="${eyeR}" ry="${eyeR * 1.15}" fill="${COLORS.ink}" />
      <circle cx="${cx - eyeOff + size * 0.012}" cy="${eyeY - size * 0.012}" r="${size * 0.011}" fill="#FFFFFF" />
      <circle cx="${cx + eyeOff + size * 0.012}" cy="${eyeY - size * 0.012}" r="${size * 0.011}" fill="#FFFFFF" />
      <path d="M ${cx} ${noseY} l -${size * 0.045} ${size * 0.035} a ${size * 0.035} ${size * 0.035} 0 0 0 ${size * 0.09} 0 z" fill="${COLORS.ink}" />
      <path d="M ${cx} ${mouthY} v ${size * 0.04} M ${cx} ${mouthY + size * 0.04} q -${size * 0.045} ${size * 0.045} -${size * 0.09} ${size * 0.025} M ${cx} ${mouthY + size * 0.04} q ${size * 0.045} ${size * 0.045} ${size * 0.09} ${size * 0.025}" fill="none" stroke="${COLORS.ink}" stroke-width="${size * 0.015}" stroke-linecap="round" />
    </g>
  `;
}

function flagStripes(yStart) {
  const stripeH = 12;
  return `
    <rect x="0" y="${yStart}" width="${W}" height="${stripeH}" fill="${COLORS.red}" />
    <rect x="0" y="${yStart + stripeH}" width="${W}" height="${stripeH}" fill="${COLORS.blue}" />
    <rect x="0" y="${yStart + stripeH * 2}" width="${W}" height="${stripeH}" fill="${COLORS.apricot}" />
  `;
}

function commonDefs() {
  return `
    <defs>
      <radialGradient id="mane" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#F2A800" />
        <stop offset="100%" stop-color="#D17400" />
      </radialGradient>
      <radialGradient id="face" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#FFD89A" />
        <stop offset="100%" stop-color="#F1B45F" />
      </radialGradient>
      <pattern id="dots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill="rgba(27,27,47,0.05)" />
      </pattern>
    </defs>
  `;
}

function defaultCardSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${commonDefs()}
    <rect width="${W}" height="${H}" fill="${COLORS.cream}" />
    <rect width="${W}" height="${H}" fill="url(#dots)" />
    ${lionSvg({ x: 80, y: (H - 420) / 2, size: 420 })}
    <g font-family="Fraunces, Georgia, serif">
      <text x="600" y="220" font-size="80" font-weight="900" fill="${COLORS.ink}">Amara&apos;s</text>
      <text x="600" y="310" font-size="80" font-weight="900" fill="${COLORS.red}">Book Group</text>
    </g>
    <g font-family="Nunito, sans-serif" fill="${COLORS.inkSoft}">
      <text x="600" y="380" font-size="32" font-weight="600">Armenian children&apos;s books</text>
      <text x="600" y="425" font-size="32" font-weight="600">for little hearts.</text>
    </g>
    <g font-family="Nunito, sans-serif">
      <text x="600" y="510" font-size="22" font-weight="700" fill="${COLORS.blue}" letter-spacing="4">SUPPORTING WESTERN ARMENIAN</text>
      <text x="600" y="544" font-size="22" font-weight="700" fill="${COLORS.blue}" letter-spacing="4">REVIVAL</text>
    </g>
    ${flagStripes(H - 36)}
  </svg>`;
}

function bookCardSvg(book, coverDataUrl) {
  const coverW = 360;
  const coverH = 450;
  const coverX = 90;
  const coverY = (H - coverH) / 2 - 18;
  const textX = coverX + coverW + 70;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${commonDefs()}
    <rect width="${W}" height="${H}" fill="${COLORS.cream}" />
    <rect width="${W}" height="${H}" fill="url(#dots)" />

    <rect x="${coverX + 18}" y="${coverY + 18}" width="${coverW}" height="${coverH}" rx="20" fill="${COLORS.apricot}" opacity="0.45" />
    <clipPath id="coverClip">
      <rect x="${coverX}" y="${coverY}" width="${coverW}" height="${coverH}" rx="20" />
    </clipPath>
    <image href="${coverDataUrl}" x="${coverX}" y="${coverY}" width="${coverW}" height="${coverH}" preserveAspectRatio="xMidYMid slice" clip-path="url(#coverClip)" />
    <rect x="${coverX}" y="${coverY}" width="${coverW}" height="${coverH}" rx="20" fill="none" stroke="rgba(27,27,47,0.15)" stroke-width="2" />

    <g>
      <rect x="${textX}" y="120" rx="24" ry="24" width="240" height="48" fill="${COLORS.apricot}" opacity="0.25" />
      <text x="${textX + 22}" y="152" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="${COLORS.ink}">${escapeXml(book.ageRange)}</text>
    </g>

    <g font-family="Fraunces, Georgia, serif" fill="${COLORS.ink}">
      ${wrapTitle(book.title, textX, 220, 64, 600)}
    </g>

    <g font-family="Nunito, sans-serif" fill="${COLORS.inkSoft}">
      ${wrapText(book.tagline, textX, 380, 28, 600, 4)}
    </g>

    <g>
      <text x="${textX}" y="500" font-family="Fraunces, Georgia, serif" font-size="44" font-weight="900" fill="${COLORS.red}">${escapeXml(book.price)}<tspan dx="14" font-family="Nunito, sans-serif" font-size="22" font-weight="700" fill="${COLORS.inkSoft}">USD</tspan></text>
    </g>

    <g font-family="Nunito, sans-serif">
      <text x="${textX}" y="560" font-size="20" font-weight="700" fill="${COLORS.blue}" letter-spacing="3">AMARA&apos;S BOOK GROUP</text>
    </g>

    ${flagStripes(H - 36)}
  </svg>`;
}

// Tiny word-wrap for Fraunces title text. Crude but adequate at 1-2 lines.
function wrapTitle(text, x, y, fontSize, maxWidth) {
  const lines = wrapWords(text, maxWidth, fontSize * 0.55);
  return lines
    .slice(0, 2)
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * (fontSize + 6)}" font-size="${fontSize}" font-weight="900">${escapeXml(line)}</text>`
    )
    .join("\n      ");
}

function wrapText(text, x, y, fontSize, maxWidth, maxLines) {
  const lines = wrapWords(text, maxWidth, fontSize * 0.52);
  return lines
    .slice(0, maxLines)
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * (fontSize + 8)}" font-size="${fontSize}" font-weight="600">${escapeXml(line)}</text>`
    )
    .join("\n      ");
}

function wrapWords(text, maxWidth, approxCharWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length * approxCharWidth > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function imageToDataUrl(absPath) {
  const buffer = await readFile(absPath);
  const ext = absPath.split(".").pop().toLowerCase();
  const mime =
    ext === "png" ? "image/png" : ext === "svg" ? "image/svg+xml" : "image/jpeg";
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

async function rasterize(svg, outPath) {
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // Default lion card
  const defaultPath = resolve(OUT, "og-default.jpg");
  await rasterize(defaultCardSvg(), defaultPath);
  console.log(`  wrote ${defaultPath.replace(ROOT + "/", "")}`);

  // One card per book
  for (const book of books) {
    const coverAbs = resolve(PUBLIC, book.cover.replace(/^\//, ""));
    const dataUrl = await imageToDataUrl(coverAbs);
    const out = resolve(OUT, `og-${book.slug}.jpg`);
    await rasterize(bookCardSvg(book, dataUrl), out);
    console.log(`  wrote ${out.replace(ROOT + "/", "")}`);
  }

  console.log("\nGenerated OG share cards.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
