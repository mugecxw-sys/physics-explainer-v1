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
  "physics/relativity/speed-of-light-same-for-everyone/index.html",
  "physics/atomic/electron-fall-into-nucleus/index.html", "physics/atomic/atoms-empty-space/index.html",
  "audio/quantum-measurement/index.html", "audio/quantum/quantum-measurement.mp3",
  "audio/time-dilation/index.html", "audio/relativity/moving-fast-changes-time.mp3",
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
const exportOrigin = production ? productionOrigin : new URL(sitemapUrls[0]).origin;
if (sitemapUrls.length !== 20) throw new Error(`Unexpected sitemap URL count: ${sitemapUrls.length}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) throw new Error("Sitemap contains duplicate URLs");
for (const url of sitemapUrls) {
  if (!existsSync(outputFileForUrl(url))) throw new Error(`Sitemap URL has no exported page: ${url}`);
  const html = readFileSync(outputFileForUrl(url), "utf8");
  if (canonicalFromHtml(html, url) !== url) throw new Error(`Sitemap URL and canonical disagree: ${url}`);
}
for (const relativePath of forbidden.filter((item) => item.startsWith("physics/"))) {
  const forbiddenPath = `/${relativePath.replaceAll("\\", "/").replace(/index\.html$/, "")}`;
  if (sitemapUrls.some((url) => new URL(url).pathname === forbiddenPath)) throw new Error(`Unpublished URL found in sitemap: ${forbiddenPath}`);
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
if (!homepage.includes('<h2 id="audio-heading">Audio Explainers</h2>') || !homepage.includes('href="/audio/quantum-measurement/"') || !homepage.includes('href="/audio/time-dilation/"')) throw new Error("Homepage Audio Explainers links are incomplete");
if (homepage.includes('href="/audio/"')) throw new Error("Homepage links to an unpublished Audio Hub");
const homepageAudioSection = homepage.match(/<section class="section shell" aria-labelledby="audio-heading">([\s\S]*?)<\/section>/);
if (!homepageAudioSection || (homepageAudioSection[1].match(/class="topic-link"/g) ?? []).length !== 2) throw new Error("Homepage must show exactly two matching Audio Explainer cards");
const homepageHeader = homepage.match(/<header class="site-header">([\s\S]*?)<\/header>/);
if (!homepageHeader || homepageHeader[1].includes('href="/audio/"')) throw new Error("Header must not link to an unpublished Audio Hub");
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

const lightSpeedPath = "/physics/relativity/speed-of-light-same-for-everyone/";
const lightSpeedHtml = readFileSync(path.join(outDir, "physics", "relativity", "speed-of-light-same-for-everyone", "index.html"), "utf8");
if (!lightSpeedHtml.includes("<h1>Why Is the Speed of Light the Same for Everyone?</h1>")) throw new Error("Speed of light article H1 is missing or duplicated");
if (!lightSpeedHtml.includes("<h2>Short Answer</h2>")) throw new Error("Speed of light Short Answer is missing");
if (!lightSpeedHtml.includes('class="equation-block" role="math"')) throw new Error("Accessible velocity equations are missing");
if (/\\frac|Visual Specification|Panel A — Observer A|Do not draw/.test(lightSpeedHtml)) throw new Error("Unrendered math or implementation notes appear in the article");
if (!lightSpeedHtml.includes('<svg viewBox="0 0 760 950" role="img"') || !lightSpeedHtml.includes("Two observers measure the same light speed")) throw new Error("Accessible static SVG figure is missing");
if (!lightSpeedHtml.includes("A and B do not share one absolute time grid") || !lightSpeedHtml.includes("Lorentz transformations")) throw new Error("SVG explanatory labels are missing");
if (!lightSpeedHtml.includes('href="/physics/relativity/time-dilation/"')) throw new Error("Speed of light to Time Dilation link is missing");
if (!lightSpeedHtml.includes(`rel="canonical" href="${exportOrigin}${lightSpeedPath}"`)) throw new Error("Speed of light canonical is incorrect");
if ((lightSpeedHtml.match(/<h1[\s>]/g) ?? []).length !== 1) throw new Error("Speed of light page must contain exactly one H1");
if (!lightSpeedHtml.includes("OpenStax") || !lightSpeedHtml.includes("MIT OpenCourseWare") || !lightSpeedHtml.includes("Einstein Online") || !lightSpeedHtml.includes("Stanford Encyclopedia of Philosophy") || !lightSpeedHtml.includes("NIST")) throw new Error("Speed of light sources are missing");
if (/name="robots" content="[^"']*noindex/i.test(lightSpeedHtml)) throw new Error("Speed of light page must not be noindex");
const lightSpeedSchemas = schemaBlocks(lightSpeedHtml, "Speed of light article");
const lightSpeedSchema = lightSpeedSchemas.find((schema) => schema["@type"] === "Article");
if (!lightSpeedSchemas.some((schema) => schema["@type"] === "BreadcrumbList") || !lightSpeedSchema) throw new Error("Speed of light schemas are incomplete");
if (lightSpeedSchema.mainEntityOfPage !== `${production ? productionOrigin : new URL(sitemapUrls[0]).origin}${lightSpeedPath}`) throw new Error("Speed of light Article schema URL is incorrect");
for (const property of ["author", "reviewedBy", "image"]) if (property in lightSpeedSchema) throw new Error(`Empty speed of light ${property} must not render in Article schema`);

const timeDilationHtml = readFileSync(path.join(outDir, "physics", "relativity", "time-dilation", "index.html"), "utf8");
if (!timeDilationHtml.includes(`href="${lightSpeedPath}"`)) throw new Error("Time Dilation reverse link is missing");
const relativityHubHtml = readFileSync(path.join(outDir, "topics", "relativity", "index.html"), "utf8");
if (!relativityHubHtml.includes(`href="${lightSpeedPath}"`) || !relativityHubHtml.includes("Why Is the Speed of Light the Same for Everyone?")) throw new Error("Speed of light article is missing from Relativity Topic Hub");

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

const timeAudioPath = "/audio/time-dilation/";
const timeAudioHtml = readFileSync(path.join(outDir, "audio", "time-dilation", "index.html"), "utf8");
const timeAudioFile = path.join(outDir, "audio", "relativity", "moving-fast-changes-time.mp3");
if (!existsSync(timeAudioFile)) throw new Error("Audio 02 MP3 is missing from static export");
if (readFileSync(timeAudioFile).byteLength > 25 * 1024 * 1024) throw new Error("Audio 02 MP3 exceeds Cloudflare Pages static asset limit");
if (!timeAudioHtml.includes("<h1>Why Moving Fast Changes Time</h1>")) throw new Error("Audio 02 H1 is incorrect");
if (!timeAudioHtml.includes('<span aria-current="page">Time Dilation</span>')) throw new Error("Audio 02 breadcrumb label is incorrect");
if (!timeAudioHtml.includes('src="/audio/relativity/moving-fast-changes-time.mp3"') || !timeAudioHtml.includes('preload="metadata"')) throw new Error("Audio 02 player source or preload mode is incorrect");
if (timeAudioHtml.includes("autoplay") || timeAudioHtml.includes("loop")) throw new Error("Audio 02 player must not autoplay or loop");
for (const text of [
  "If you chase a car, its speed relative to you changes.",
  "This audio explainer connects the constant speed of light with time dilation",
  "What you&#x27;ll understand",
  "Why chasing light does not make it recede at c minus your speed",
  "The Rule That Breaks Everyday Intuition",
  "Why Light Doesn&#x27;t Add Speeds the Ordinary Way",
  "If Light Doesn&#x27;t Change, Something Else Must",
  "The Light Clock",
  "You Never Feel Your Own Time Slow Down",
  "How Can Both Observers Say the Other Clock Is Slow?",
  "The Twin Paradox Without the Drama",
  "This Is Not Just Something We See",
  "What You Should Actually Remember",
  "This audio combines two related Physics, Plainly.",
  "It is written for listening rather than as a word-for-word reading of either article.",
]) {
  if (!timeAudioHtml.includes(text)) throw new Error(`Audio 02 page is missing expected content: ${text}`);
}
const chaptersMatch = timeAudioHtml.match(/<ol class="chapters">([\s\S]*?)<\/ol>/);
if (!chaptersMatch || /<time\b/.test(chaptersMatch[1])) throw new Error("Audio 02 chapters must not contain invented timestamps");
const relatedMatch = timeAudioHtml.match(/<section aria-labelledby="related-reading-heading">([\s\S]*?)<\/section>/);
if (!relatedMatch || !relatedMatch[1].includes('href="/physics/relativity/time-dilation/"') || !relatedMatch[1].includes('href="/physics/relativity/speed-of-light-same-for-everyone/"') || (relatedMatch[1].match(/class="question-row"/g) ?? []).length !== 2) throw new Error("Audio 02 must link to exactly its two related articles");
if (!timeAudioHtml.includes("A plain-English audio explanation of why the speed of light stays invariant") || !timeAudioHtml.includes("Sources")) throw new Error("Audio 02 description or sources are missing");
const sourceList = timeAudioHtml.match(/<section class="article-support sources"[\s\S]*?<ol>([\s\S]*?)<\/ol>/);
if (!sourceList || (sourceList[1].match(/<li>/g) ?? []).length !== 7 || /href="http:\/\//.test(sourceList[1])) throw new Error("Audio 02 Sources must contain its seven HTTPS references");
if (timeAudioHtml.includes("TTS SCRIPT") || timeAudioHtml.includes("PRODUCTION NOTES")) throw new Error("Audio 02 production script text leaked into the public page");
if (!timeAudioHtml.includes(`rel="canonical" href="${exportOrigin}${timeAudioPath}"`)) throw new Error("Audio 02 canonical is incorrect");
const timeAudioSchemas = schemaBlocks(timeAudioHtml, "Audio 02 page");
if (!timeAudioSchemas.some((schema) => schema["@type"] === "BreadcrumbList")) throw new Error("Audio 02 BreadcrumbList schema is missing");
if (!timeAudioSchemas.some((schema) => schema["@type"] === "WebSite") || !timeAudioSchemas.some((schema) => schema["@type"] === "Organization")) throw new Error("Audio 02 WebSite or Organization schema is missing");
const timeAudioSchema = timeAudioSchemas.find((schema) => schema["@type"] === "AudioObject");
if (!timeAudioSchema || timeAudioSchema.contentUrl !== `${exportOrigin}/audio/relativity/moving-fast-changes-time.mp3` || timeAudioSchema.encodingFormat !== "audio/mpeg") throw new Error("Audio 02 AudioObject data is incorrect");
for (const property of ["author", "reviewedBy", "thumbnailUrl", "uploadDate", "duration"]) if (property in timeAudioSchema) throw new Error(`Unsupported empty AudioObject ${property} must not render`);
if (homepage.includes('href="/audio/"') || existsSync(path.join(outDir, "audio", "index.html"))) throw new Error("Audio Hub must not be generated before it has content and approval");
if (sitemapUrls.includes(`${exportOrigin}/audio/`)) throw new Error("Audio Hub must not appear in sitemap");
for (const slug of ["time-dilation", "speed-of-light-same-for-everyone"]) {
  const article = readFileSync(path.join(outDir, "physics", "relativity", slug, "index.html"), "utf8");
  if (!article.includes('href="/audio/time-dilation/"')) throw new Error(`Audio 02 article listening link is missing from ${slug}`);
}
const sitemapMp3Urls = sitemapUrls.filter((url) => /\.mp3$/i.test(url));
if (sitemapMp3Urls.length > 0) throw new Error("Sitemap must not contain MP3 assets");
if (!sitemapUrls.includes(`${productionOrigin}${timeAudioPath}`)) throw new Error("Audio 02 page is missing from sitemap");

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
