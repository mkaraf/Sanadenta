# SanaDenta

Website for **SanaDenta**, a dental hygiene clinic in Zlín-Malenovice, Czech Republic — [sanadenta.cz](https://www.sanadenta.cz/).

Built with [Astro 6](https://astro.build/) + [Tailwind CSS 4](https://tailwindcss.com/) on the [AstroWind](https://github.com/arthelokyo/astrowind) template, deployed as a static site on Cloudflare.

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
│   │   ├── ui/                # Generic building blocks (WidgetWrapper, ItemGrid)
│   │   ├── widgets/            # Page sections (Hero, Content, OurTeam, Services, Pricing, Footer, ...)
│   │   ├── Contact.astro       # Contact section (hours, phone/email, map)
│   │   └── Fonts.astro         # Self-hosted font imports + preloads
│   ├── data/                   # Contact details, opening hours, price list (shared by UI and JSON-LD)
│   ├── layouts/                # Layout.astro (base HTML shell), PageLayout.astro, MarkdownLayout.astro
│   ├── pages/
│   │   ├── index.astro          # Homepage — the only real landing page
│   │   ├── 404.astro
│   │   └── ochrana-osobnich-udaju.md   # Privacy policy (GDPR)
│   ├── utils/
│   ├── config.yaml              # Site name, SEO defaults, i18n, theme settings
│   └── navigation.ts            # Header/footer links and social profiles
├── astro.config.ts
└── wrangler.jsonc            # Cloudflare deploy config
```

There is no blog on this site; the AstroWind blog and extra template components have been removed.

## Configuration

Site-wide settings (name, default SEO metadata, i18n) live in `src/config.yaml`. Contact details, opening hours and prices are in `src/data/` and feed both the page and the structured data (JSON-LD) in `src/components/common/SchemaOrg.astro`. Navigation links and social profiles (used by both header and footer) are in `src/navigation.ts`.

Design tokens (colors, shadows, fonts, animations) are defined once in the `@theme` block of `src/assets/styles/tailwind.css`. Font files are loaded and preloaded in `src/components/Fonts.astro`.

## Deploy

The site builds to a static `./dist/` folder and is deployed on Cloudflare (see `wrangler.jsonc`):

```shell
npm run build
```

## License

This is a private client project, not the open-source AstroWind template. See `LICENSE.md` for the underlying template's license.
