# Physics Explainer V1

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
- Preview environment: `SITE_DEPLOYMENT=preview`
- Preview site URL: `NEXT_PUBLIC_SITE_URL=https://project-name.pages.dev`

Preview builds generate both `X-Robots-Tag: noindex, nofollow` in `_headers` and a disallow-all `robots.txt`.

For the future custom-domain production build, set `SITE_DEPLOYMENT=production` and set `NEXT_PUBLIC_SITE_URL` to the canonical domain. At the same time, configure a Cloudflare Redirect Rule that permanently redirects the `*.pages.dev` hostname to the canonical hostname. This replaces the preview canonical at build time, keeps the custom domain indexable, and prevents an indexable duplicate on `pages.dev`.

Audio files will live outside this repository at `https://audio.yourdomain.com/{cluster}/{filename}.mp3`.
