import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const expected = [
  "index.html",
  "topics/index.html",
  "topics/quantum/index.html",
  "topics/relativity/index.html",
  "topics/atomic-physics/index.html",
  "topics/thermodynamics/index.html",
  "physics/quantum/observer-effect/index.html",
  "physics/quantum/measurement-problem/index.html",
  "physics/quantum/entanglement-faster-than-light/index.html",
  "physics/relativity/time-dilation/index.html",
  "physics/atomic/electron-fall-into-nucleus/index.html",
  "physics/atomic/atoms-empty-space/index.html",
  "sitemap.xml",
  "robots.txt",
  "_headers",
];

const forbidden = [
  "physics/relativity/speed-of-light/index.html",
  "physics/relativity/gravity-bends-light/index.html",
  "physics/relativity/relativity-of-simultaneity/index.html",
  "physics/atomic/atomic-emission/index.html",
  "physics/atomic/orbits-vs-orbitals/index.html",
  "physics/thermodynamics/why-entropy-increases/index.html",
  "physics/thermodynamics/entropy-disorder/index.html",
  "physics/thermodynamics/can-entropy-decrease/index.html",
  "audio/index.html",
];

for (const relativePath of expected) {
  if (!existsSync(path.join("out", relativePath))) throw new Error(`Missing exported file: ${relativePath}`);
}
for (const relativePath of forbidden) {
  if (existsSync(path.join("out", relativePath))) throw new Error(`Forbidden route was exported: ${relativePath}`);
}

const sitemap = readFileSync(path.join("out", "sitemap.xml"), "utf8");
for (const relativePath of forbidden.filter((item) => item.startsWith("physics/"))) {
  const slug = relativePath.split("/").at(-2);
  if (slug && sitemap.includes(slug)) throw new Error(`Unpublished slug found in sitemap: ${slug}`);
}

const headers = readFileSync(path.join("out", "_headers"), "utf8");
if (!headers.includes("X-Robots-Tag: noindex")) throw new Error("Preview noindex header is missing");

const robots = readFileSync(path.join("out", "robots.txt"), "utf8");
if (!robots.includes("Disallow: /")) throw new Error("Preview robots.txt must disallow crawling");

const homepage = readFileSync(path.join("out", "index.html"), "utf8");
if (homepage.includes("Featured Audio") || homepage.includes("Listen to the episode")) throw new Error("Empty audio module rendered on homepage");
if (!homepage.includes("href=\"/topics/\"")) throw new Error("Core navigation is not a real link");
if (!homepage.includes('"@type":"WebSite"') || !homepage.includes('"@type":"Organization"')) throw new Error("Site schemas are missing");

const articleHtml = readFileSync(path.join("out", "physics", "quantum", "observer-effect", "index.html"), "utf8");
if (!articleHtml.includes('rel="canonical" href="https://yourdomain.com/physics/quantum/observer-effect/"')) throw new Error("Article canonical is incorrect");
if (!articleHtml.includes('property="og:title"') || !articleHtml.includes('name="twitter:card"')) throw new Error("Article social metadata is incomplete");
if (!articleHtml.includes('"@type":"BreadcrumbList"') || !articleHtml.includes('"@type":"Article"')) throw new Error("Article schemas are incomplete");
if (articleHtml.includes("Scientifically Reviewed") || articleHtml.includes("Expert Reviewed") || articleHtml.includes("Reviewed by Physicist") || articleHtml.includes('"reviewedBy"')) throw new Error("Empty review metadata must not render");

const urlCount = (sitemap.match(/<url>/g) ?? []).length;
if (urlCount !== 17) throw new Error(`Unexpected sitemap URL count: ${urlCount}`);

console.log(`Verified ${expected.length} required outputs; unpublished and empty audio routes are absent.`);
