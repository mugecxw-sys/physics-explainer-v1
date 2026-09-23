import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const outDir = "out";
const production = process.env.SITE_DEPLOYMENT === "production";
const productionOrigin = "https://physicsplainly.com";
const expected = [
  "index.html", "topics/index.html", "topics/quantum/index.html", "topics/relativity/index.html",
  "topics/atomic-physics/index.html", "topics/thermodynamics/index.html", "about/index.html",
  "editorial-policy/index.html", "scientific-review/index.html", "sources/index.html", "privacy/index.html",
  "physics/quantum/observer-effect/index.html", "physics/quantum/measurement-problem/index.html",
  "physics/quantum/entanglement-faster-than-light/index.html", "physics/relativity/time-dilation/index.html",
  "physics/atomic/electron-fall-into-nucleus/index.html", "physics/atomic/atoms-empty-space/index.html",
  "audio/quantum-measurement/index.html", "audio/quantum/quantum-measurement.mp3",
  "sitemap.xml", "robots.txt", "_headers",
];
const forbidden = [
  "physics/relativity/speed-of-light/index.html", "physics/relativity/gravity-bends-light/index.html",
  "physics/relativity/relativity-of-simultaneity/index.html", "physics/atomic/atomic-emission/index.html",
  "physics/atomic/orbits-vs-orbitals/index.html", "physics/thermodynamics/why-entropy-increases/index.html",
  "physics/thermodynamics/entropy-disorder/index.html", "physics/thermodynamics/can-entropy-decrease/index.html",
  "audio/index.html",
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function outputFileForUrl(url) {
  const pathname = new URL(url).pathname;
  return pathname === "/" ? path.join(outDir, "index.html") : path.join(outDir, pathname, "index.html");
}

function canonicalFromHtml(html, source) {
  const matches = [...html.matchAll(/<link rel="canonical" href="([^"]+)"\/>/g)];
  if (matches.length !== 1) throw new Error(`${source} must have exactly one canonical`);
  return matches[0][1];
}

function schemaBlocks(html, source) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => {
    try { return JSON.parse(match[1]); } catch { throw new Error(`${source} contains invalid JSON-LD`); }
  });
}

for (const relativePath of expected) {
  if (!existsSync(path.join(outDir, relativePath))) throw new Error(`Missing exported file: ${relativePath}`);
}
for (const relativePath of forbidden) {
  if (existsSync(path.join(outDir, relativePath))) throw new Error(`Forbidden route was exported: ${relativePath}`);
}

const sitemap = readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== 18) throw new Error(`Unexpected sitemap URL count: ${sitemapUrls.length}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) throw new Error("Sitemap contains duplicate URLs");
for (const url of sitemapUrls) {
  if (!existsSync(outputFileForUrl(url))) throw new Error(`Sitemap URL has no exported page: ${url}`);
  const html = readFileSync(outputFileForUrl(url), "utf8");
  if (canonicalFromHtml(html, url) !== url) throw new Error(`Sitemap URL and canonical disagree: ${url}`);
}
for (const relativePath of forbidden.filter((item) => item.startsWith("physics/"))) {
  const slug = relativePath.split("/").at(-2);
  if (slug && sitemap.includes(slug)) throw new Error(`Unpublished slug found in sitemap: ${slug}`);
}

const headers = readFileSync(path.join(outDir, "_headers"), "utf8");
const robots = readFileSync(path.join(outDir, "robots.txt"), "utf8");
const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html") && !file.includes(`${path.sep}_next${path.sep}`));
const indexableHtml = sitemapUrls.map(outputFileForUrl);

if (production) {
  if (headers.includes("X-Robots-Tag: noindex")) throw new Error("Production must not return X-Robots-Tag: noindex");
  if (!robots.includes("User-Agent: *\nAllow: /")) throw new Error("Production robots.txt must allow crawling");
  if (robots.includes("Disallow: /")) throw new Error("Production robots.txt must not disallow crawling");
  if (!robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) throw new Error("Production robots.txt sitemap is incorrect");
  for (const url of sitemapUrls) if (!url.startsWith(`${productionOrigin}/`)) throw new Error(`Production sitemap has a non-canonical host: ${url}`);
  const productionOutput = [sitemap, robots, headers, ...indexableHtml.map((file) => readFileSync(file, "utf8"))].join("\n");
  for (const reference of ["pages.dev", "localhost", "example.com", "SITE_NAME", "yourdomain.com", "audio.domain.com"]) {
    if (productionOutput.includes(reference)) throw new Error(`Production output contains forbidden reference: ${reference}`);
  }
  for (const file of indexableHtml) {
    const html = readFileSync(file, "utf8");
    if (/name="robots" content="[^"']*noindex/i.test(html)) throw new Error(`${file} contains a production noindex tag`);
    if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) throw new Error(`${file} must have exactly one H1`);
  }
} else {
  if (!headers.includes("X-Robots-Tag: noindex")) throw new Error("Preview noindex header is missing");
  if (!robots.includes("Disallow: /")) throw new Error("Preview robots.txt must disallow crawling");
}

const titles = new Set();
for (const url of sitemapUrls) {
  const html = readFileSync(outputFileForUrl(url), "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) throw new Error(`${url} is missing a title`);
  if (titles.has(title)) throw new Error(`Duplicate title found: ${title}`);
  titles.add(title);
  if (!html.includes('property="og:title"') || !html.includes('property="og:description"') || !html.includes('property="og:url"') || !html.includes('name="twitter:card"')) throw new Error(`${url} has incomplete social metadata`);
  if (production && !html.includes(`property="og:url" content="${url}"`)) throw new Error(`${url} has an incorrect OG URL`);
}

const homepage = readFileSync(path.join(outDir, "index.html"), "utf8");
if (!homepage.includes("Featured Audio") || !homepage.includes('href="/audio/quantum-measurement/"')) throw new Error("Featured Audio is missing from homepage");
if (!homepage.includes('href="/topics/"')) throw new Error("Core navigation is not a real link");
const homeSchemas = schemaBlocks(homepage, "Homepage");
if (!homeSchemas.some((schema) => schema["@type"] === "WebSite") || !homeSchemas.some((schema) => schema["@type"] === "Organization")) throw new Error("Homepage schemas are missing");

const articleUrl = `${production ? productionOrigin : new URL(sitemapUrls[0]).origin}/physics/quantum/observer-effect/`;
const articleHtml = readFileSync(path.join(outDir, "physics", "quantum", "observer-effect", "index.html"), "utf8");
if (!articleHtml.includes("What Is the Observer Effect in Quantum Mechanics?")) throw new Error("Article content is not present in static HTML");
if (!articleHtml.includes("Sources")) throw new Error("Article sources are not present in static HTML");
if (!articleHtml.includes('href="/topics/quantum/"')) throw new Error("Article breadcrumb does not link to its topic");
const articleSchemas = schemaBlocks(articleHtml, "Observer Effect article");
const articleSchema = articleSchemas.find((schema) => schema["@type"] === "Article");
if (!articleSchemas.some((schema) => schema["@type"] === "BreadcrumbList") || !articleSchema) throw new Error("Article schemas are incomplete");
if (articleSchema.mainEntityOfPage !== articleUrl) throw new Error("Article schema canonical URL is incorrect");
for (const property of ["author", "reviewedBy", "image"]) if (property in articleSchema) throw new Error(`Empty ${property} must not render in Article schema`);

const audioHtml = readFileSync(path.join(outDir, "audio", "quantum-measurement", "index.html"), "utf8");
if (!audioHtml.includes("Why Quantum Physics Gets Weird When You Measure It")) throw new Error("Audio page heading is missing");
if (!audioHtml.includes('src="/audio/quantum/quantum-measurement.mp3"')) throw new Error("Audio player source is incorrect");
if (!audioHtml.includes('preload="metadata"')) throw new Error("Audio player must preload metadata only");
if (audioHtml.includes('autoplay') || audioHtml.includes('loop')) throw new Error("Audio player must not autoplay or loop");
if (!audioHtml.includes('"@type":"AudioObject"')) throw new Error("AudioObject schema is missing");
if (audioHtml.includes('"duration"') || audioHtml.includes('"author"') || audioHtml.includes('"reviewedBy"') || audioHtml.includes('"image"')) throw new Error("Audio schema contains an unsupported empty field");
for (const href of ["/physics/quantum/observer-effect/", "/physics/quantum/measurement-problem/", "/physics/quantum/entanglement-faster-than-light/"]) {
  if (!audioHtml.includes(`href="${href}"`)) throw new Error(`Audio related reading link is missing: ${href}`);
}
for (const articlePath of ["observer-effect", "measurement-problem", "entanglement-faster-than-light"]) {
  const html = readFileSync(path.join(outDir, "physics", "quantum", articlePath, "index.html"), "utf8");
  if (!html.includes('href="/audio/quantum-measurement/"')) throw new Error(`Audio listening link is missing from ${articlePath}`);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/<a[^>]+href="(\/[^"#?]*)"/g)) {
    const href = match[1];
    if (href.startsWith("/_next/")) continue;
    const target = href === "/" ? path.join(outDir, "index.html") : path.join(outDir, href, "index.html");
    if (!existsSync(target)) throw new Error(`Broken internal link in ${file}: ${href}`);
  }
}

console.log(`Verified ${sitemapUrls.length} canonical sitemap URLs in ${production ? "production" : "preview"} mode.`);
