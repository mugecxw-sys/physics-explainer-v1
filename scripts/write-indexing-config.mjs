import { mkdir, writeFile } from "node:fs/promises";

const isProduction = process.env.SITE_DEPLOYMENT === "production";
const contents = isProduction
  ? "# Production indexing is enabled. Keep the pages.dev hostname redirected at Cloudflare.\n"
  : "/*\n  X-Robots-Tag: noindex, nofollow\n";

await mkdir("public", { recursive: true });
await writeFile("public/_headers", contents, "utf8");
