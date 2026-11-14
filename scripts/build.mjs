// Copies ./site to ./dist and fills in the site's public URL.
//
// On Netlify the URL comes from Netlify's own `URL` variable, which becomes
// your custom domain as soon as you add one and redeploy. Locally you can run:
//   SITE_URL=https://www.example.com node scripts/build.mjs
// No npm packages needed (Node 18+).
import { cpSync, readFileSync, writeFileSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "site");
const out = join(root, "dist");

const siteUrl = (process.env.SITE_URL || process.env.URL || "").replace(/\/+$/, "");
const buildDate = new Date().toISOString().slice(0, 10);

rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true });

const TEXT = new Set([".html", ".xml", ".txt", ".webmanifest", ".json"]);
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!TEXT.has(extname(p))) continue;
    const before = readFileSync(p, "utf8");
    const after = before.replaceAll("__SITE_URL__", siteUrl).replaceAll("__BUILD_DATE__", buildDate);
    if (after !== before) writeFileSync(p, after);
  }
}
walk(out);

if (!siteUrl) {
  // Without a known URL, a sitemap with relative links would be invalid.
  rmSync(join(out, "sitemap.xml"), { force: true });
  const robots = join(out, "robots.txt");
  writeFileSync(robots, readFileSync(robots, "utf8").replace(/^Sitemap:.*\n?/m, ""));
  console.log("Built ./dist (no SITE_URL set: sitemap skipped, links are relative).");
} else {
  console.log(`Built ./dist for ${siteUrl}`);
}
