# Physics, Plainly.

A static, English-language physics explainer built with Next.js App Router and TypeScript. Published article routes are generated exclusively from MDX files in `content/articles`.

## Local checks

```bash
npm install
npm run typecheck
npm run build
npm run verify
```

The generated static site is written to `out/`.

## Cloudflare Pages

- Framework preset: Next.js (Static HTML Export)
- Build command: `pnpm build`
- Output directory: `out`
- Production site URL: `NEXT_PUBLIC_SITE_URL=https://physicsplainly.com`
- Production deployment: `SITE_DEPLOYMENT=production`

Preview builds must set `SITE_DEPLOYMENT=preview` and their actual Pages hostname in `NEXT_PUBLIC_SITE_URL`. They generate both `X-Robots-Tag: noindex, nofollow` in `_headers` and a disallow-all `robots.txt`.

For production, Cloudflare Pages must use `SITE_DEPLOYMENT=production` and `NEXT_PUBLIC_SITE_URL=https://physicsplainly.com`. Configure a Cloudflare Bulk Redirect that permanently redirects the assigned `*.pages.dev` hostname to `https://physicsplainly.com`, preserving both path and query string. Also redirect every `www` hostname variant to the apex hostname, preserving path and query string.

No audio host is configured yet. When Cloudflare R2 audio is live, set `NEXT_PUBLIC_AUDIO_BASE_URL` to its real HTTPS origin; MP3 files do not belong in this repository.
