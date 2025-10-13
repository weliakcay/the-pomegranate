# The Pomegranate — Production-Ready Apple-Style Experience

Luxury-minimal Next.js 14 (App Router) site with cinematic scroll storytelling, 3D hero, multilingual support (en · tr · de · ja · es), and research-ready content seeds.

## Tech Stack

- Next.js 14 · App Router · TypeScript · Edge-ready
- Tailwind CSS + CSS variables for tokens
- GSAP ScrollTrigger · Lenis smooth scroll · Framer Motion micro-interactions
- react-three-fiber + drei (3D) with fallback Lottie
- next-intl i18n (en, tr, de, ja, es)
- MDX-powered science and blog content
- next-metadata API · Open Graph · structured data
- Vercel-first deployment, Lighthouse ≥ 90 (mobile) objective

## Getting Started

```bash
pnpm install
pnpm dev
```

- **Node:** ≥ 18.18 (PNPM preferred). Switch via `nvm use 18` or `corepack enable`.
- `pnpm build` + `pnpm start` for production.

## Project Layout

```
app/               # App Router routes per locale + APIs + metadata
components/        # Hero, sticky features, 3D + motion helpers
content/           # MDX articles & blog posts, gallery seed JSON
lib/               # i18n, MDX compilation, analytics stubs
messages/          # next-intl locale JSON dictionaries
public/            # Placeholder images, Lottie, GLB, OG image
styles/            # prose overrides for MDX typography
```

## 3D & Motion

- Hero uses `react-three-fiber`, `@react-three/drei`, and GSAP timelines.
- Replace `public/3d/pomegranate.glb` with your production asset. For best results:
  1. Model in Blender or similar; align scale around unit sphere.
  2. Optimize: `gltf-pipeline -i raw.glb -o optimized.glb --draco`.
  3. Drop file into `public/3d/pomegranate.glb`.
- Fallback Lottie: replace `public/lottie/pomegranate.json`. Preview via https://lottiefiles.com/.
- GSAP timelines are scoped (`gsap.context`) and disabled when `prefers-reduced-motion` matches.

## Localization

- Locale routing: `/en`, `/tr`, `/de`, `/ja`, `/es`.
- Update translations in `messages/{locale}.json`. Keys mirror UI sections.
- Add new locale:
  1. Append code to `lib/i18n.ts` `locales`.
  2. Create `messages/{new-locale}.json`.
  3. (Optional) Extend `README` + marketing copy.
  4. Redeploy — middleware automatically handles it.

## Content Authoring

- Blog: add MDX files to `content/blog/*.mdx`.
- Science articles: add MDX to `content/science/*.mdx`.
  - Frontmatter fields: `title`, `description`, `publishedAt`, `tags`, `author`, optional `toc`, `references`.
  - Article detail pages auto-generate reading time and schema.org Article JSON-LD.
- Hot reload picks up new content; rebuild for production.

## Deployment

- `pnpm build` ensures production readiness.
- Deploy to Vercel: connect repo, set framework = Next.js.
- Edge-friendly: App Router + `next-intl` middleware.
- Configure Environment (optional):
  - `NEXT_PUBLIC_VERCEL_ENV` for analytics segmentation.
  - Add `VERCEL_ANALYTICS_ID` if using Vercel Web Analytics.

## Performance & Accessibility

- Smooth scroll via Lenis with reduced-motion guard.
- Lazy 3D mount; fallback Lottie ensures non-WebGL clients.
- Use `next/image` for gallery/media (replace placeholders with optimized images, ideally < 200KB each).
- Stick to GSAP timeline hygiene: destroy triggers on cleanup, reuse contexts.
- Landmarks and skip links in place; ensure alt text updates with final imagery.

## Quality Checklist

- `pnpm lint` for ESLint.
- `pnpm format` to run Prettier (Tailwind plugin included).
- `pnpm typecheck` (tsc in `--noEmit`).
- Lighthouse target ≥ 90 mobile (test on `/en` home and `/en/science/{slug}`).
- Validate structured data via https://search.google.com/test/rich-results.

Enjoy exploring **The Pomegranate** core experience.
```
