#!/usr/bin/env node
/**
 * Photographs a piece of the REAL CampusAI demo, sharp enough to film.
 *
 *   npm run capture -- <path> <out.png> [--el "<css selector>"] [--keep "<css selector>"]
 *                      [--width 1500] [--height 982] [--scale 3] [--dark] [--wait 1500]
 *
 *   npm run capture -- /career?view=jobs public/captures/mine/board.png
 *   npm run capture -- /events public/captures/mine/first-card.png --el "article"
 *
 * Why a script and not a screenshot from the browser: every capture in a film
 * has to come out at the same viewport and the same pixel density, or cards
 * change size between cuts. And three silent defects shipped in real films
 * before these fences existed:
 *
 *  1. An element screenshot photographs whatever is PAINTED over the element,
 *     not the element. The demo's fixed chat bar (z-30) and the Feedback pill
 *     landed across cards low on the page. So every fixed layer at z>=30 is
 *     hidden first. `--keep` names one that must survive, such as an open
 *     detail modal, which is also a fixed high-z layer.
 *  2. Translucent glass shows whatever is behind it. If something bleeds
 *     through a card, hide it or capture with the card's own background.
 *  3. A modal with a max height clips its own content. Raise --height until
 *     the part you want is inside the fold, rather than cropping later.
 *
 * Runs headless against your installed Google Chrome, so it never takes over
 * your screen. If Chrome is somewhere unusual, set CHROME_PATH.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const BASE = process.env.DEMO_URL ?? "https://campusai-demo.vercel.app";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : fallback;
};
const positional = argv.filter((a, i) => !a.startsWith("--") && !(argv[i - 1] ?? "").startsWith("--"));
const [route, out] = positional;
if (!route || !out) {
  console.error('usage: npm run capture -- <path> <out.png> [--el "<selector>"] [--keep "<selector>"]');
  process.exit(2);
}

const width = Number(opt("width", 1500));
const height = Number(opt("height", 982));
const scale = Number(opt("scale", 3));
const el = opt("el", null);
const keep = opt("keep", el);
const wait = Number(opt("wait", 1500));
// Only sets the browser's light/dark preference. Checked 2026-10-09: the demo
// renders light for a fresh visitor even with --dark, so a dark capture needs
// the theme switched inside the product first. Light is what students see.
const colorScheme = argv.includes("--dark") ? "dark" : "light";

const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: scale,
  colorScheme,
});

const url = new URL(route, BASE).toString();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(wait);

// Fence 1: hide fixed chrome that would paint over the subject.
await page.evaluate((keepSelector) => {
  const kept = keepSelector ? document.querySelector(keepSelector) : null;
  for (const node of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(node);
    if (cs.position !== "fixed") continue;
    if (parseInt(cs.zIndex || "0", 10) < 30) continue;
    if (kept && (node.contains(kept) || kept.contains(node))) continue;
    node.style.display = "none";
  }
}, keep);
await page.waitForTimeout(350);

mkdirSync(dirname(out), { recursive: true });
if (el) {
  const target = page.locator(el).first();
  await target.scrollIntoViewIfNeeded();
  await target.screenshot({ path: out, animations: "disabled" });
} else {
  await page.screenshot({ path: out, animations: "disabled" });
}
await browser.close();
console.log(`captured ${url}${el ? ` (${el})` : ""} -> ${out} at ${width}x${height} @${scale}x, ${colorScheme}`);
