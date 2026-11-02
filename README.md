# SanaDenta

Website for **SanaDenta**, a dental hygiene clinic in Zlín-Malenovice, Czech Republic — [sanadenta.cz](https://www.sanadenta.cz/).

Built with [Astro 7](https://astro.build/) + [Tailwind CSS 4](https://tailwindcss.com/) on the [AstroWind](https://github.com/arthelokyo/astrowind) template, deployed as a static site on Cloudflare.

## Getting started

```shell
npm install
npm run dev       # http://localhost:4321
```

## Commands

| Command           | Action                                 |
| :---------------- | :------------------------------------- |
| `npm install`     | Install dependencies                   |
| `npm run dev`     | Start the local dev server             |
| `npm run build`   | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally   |
| `npm run check`   | Run Astro/ESLint/Prettier checks       |
| `npm run fix`     | Auto-fix lint and formatting issues    |

## Project structure

```
/
├── public/                  # Static files served as-is (robots.txt, _headers, favicons)
├── src/
│   ├── assets/               # Images, logo, and tailwind.css (design tokens, keyframes)
│   ├── components/
│   │   ├── common/            # Metadata, SchemaOrg, BasicScripts (smooth scroll + scroll-reveal JS), etc.
│   │   ├── widgets/            # Page sections (Hero, Content, OurTeam, Services, Pricing, Footer, ...)
│   │   ├── Contact.astro       # Contact section (hours, phone/email, map)
│   │   └── Fonts.astro         # Self-hosted font imports + preloads
│   ├── data/                   # Contact details, opening hours, price list (shared by UI and JSON-LD)
│   ├── layouts/                # Layout.astro (base HTML shell), PageLayout.astro, MarkdownLayout.astro
│   ├── pages/
│   │   ├── index.astro          # Homepage — the only real landing page
│   │   ├── 404.astro
│   │   └── ochrana-osobnich-udaju.md   # Privacy policy (GDPR)
│   ├── utils/                  # Image helpers, permalinks, czNbsp (Czech line-wrapping)
│   ├── config.yaml              # Site name, SEO defaults, i18n, theme settings
│   └── navigation.ts            # Header/footer links and social profiles
├── astro.config.ts
└── wrangler.jsonc            # Cloudflare deploy config
```

There is no blog on this site; the AstroWind blog and extra template components have been removed.

## Configuration

Site-wide settings (name, default SEO metadata, i18n) live in `src/config.yaml`. Contact details, opening hours and prices are in `src/data/` and feed both the page and the structured data (JSON-LD) in `src/components/common/SchemaOrg.astro`. Navigation links and social profiles (used by both header and footer) are in `src/navigation.ts`.

Design tokens (colors, shadows, fonts, animations) are defined once in the `@theme` block of `src/assets/styles/tailwind.css`. Font files are loaded and preloaded in `src/components/Fonts.astro`.

## Design rules

Keep new work consistent with these; all tokens and shared utilities live in `src/assets/styles/tailwind.css`.

- **Palette** — warm white background, gold `primary` for buttons, `primary-deep` for gold text and icons (5.4:1 on the background). Plain `primary` and `gold-bright` are too light for text (~2:1); use them only as fills.
- **Type** — Playfair Display (`font-display`) for headings, names, numbers and prices; Inter for body copy at normal tracking. A heading's key phrase is set in gold italic (`italic text-gradient-gold`). Headings use `text-balance`, paragraphs `text-pretty` and a 60–62ch measure. Prices and times use `nums` (lining, tabular figures).
- **Czech wrapping** — run body and heading strings through `czNbsp()` (`src/utils/typography.ts`) so one-letter words (v, s, k, z, o, u, a, i) never end a line.
- **Section rhythm** — every section uses `section-container` (max-w-7xl, 20/32 px gutters) and `section-spacing` (64/96 px), opening with `SectionHeading`: a small caps label between gold hairlines (echoing the hero ornament), the H2, and an optional intro.
- **Composition** — content sits on lighter `bg-card` panels (`rounded-3xl border border-border/70`) that set it apart from the page background; what goes inside varies by purpose: check-marked points beside a photo (O nás), blob-framed portrait (Náš tým), service cards with the duration as a ruled footer (Služby), tabular rows (Ceník, contact details). Hover effects only on things that are clickable.
- **Shapes** — organic blob outline (`hero-blob`) for people/hero photos; `rounded-3xl` for cards and photos; pills (`rounded-full`) for buttons and small badges only.
- **Buttons** — `btn-primary` (gold fill) for booking actions, `btn-secondary` (outline) for everything else; add `btn-glow` only to the main CTA of a screen. Minimum 44 px tall.
- **Motion** — calm and short; see `docs/motion-audit.md` for the full spec. Hover colours 150–200 ms; every control also gets a pressed (`active:`) state, since hover never fires on touch. Photos in frames marked `data-reveal` settle once as they come into view (photo eases from 1.04× and 0.6 opacity to normal over 900 ms; the frame never moves); text and booking actions never animate. No loops. Anything that moves is `motion-safe` only. Focus is an instant 2 px `primary-deep` outline (global `:focus-visible`).

## Deploy

The site builds to a static `./dist/` folder and is deployed on Cloudflare (see `wrangler.jsonc`):

```shell
npm run build
```

## License

This is a private client project, not the open-source AstroWind template. See `LICENSE.md` for the underlying template's license.
