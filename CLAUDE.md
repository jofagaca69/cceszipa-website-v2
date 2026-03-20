# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build production site to ./dist/
pnpm preview    # Preview production build locally
```

No test or lint commands are configured. Formatting is handled by Prettier with the Astro plugin (`prettier-plugin-astro`).

## Stack

- **Astro 5** — static site generator with file-based routing
- **Tailwind CSS v4** — configured via Vite plugin, no `tailwind.config.js`
- **TypeScript** (strict mode)
- **GSAP** — animations and ScrollTrigger for parallax/scroll effects
- **MDX** — available for content pages

## Architecture

### Routing

File-based routing under `src/pages/`. Currently two pages:
- `index.astro` → `/`
- `conocenos.astro` → `/conocenos`

### Layout & Component Structure

Every page wraps content in `MainLayout` (`@layouts/MainLayout.astro`), which renders Pre-header → Header → slot → Footer, plus all SEO meta tags.

Page-specific components live under `src/components/pages/<page-name>/` and are composed inside the page file.

Shared UI (header, footer, pre-header) is in `src/components/UI/`.

### SEO Pattern

Pages define an SEO object and pass it to `MainLayout`:

```astro
---
import MainLayout from "@layouts/MainLayout.astro";
const seo = { title, description, keywords, jsonLd, ... };
---
<MainLayout seo={seo}>
  ...
</MainLayout>
```

`MainLayout` passes it to `BaseSEO.astro` which renders all meta tags, Open Graph, Twitter Card, JSON-LD, and geo tags.

### Centralized Config

`src/config/institution.ts` is the single source of truth for the institution's name, phone, address, email, and social links. Reuse this instead of hardcoding values.

### Path Aliases (tsconfig.json)

```
@layouts/*   → src/components/layouts/*
@components/* → src/components/*
@config/*    → src/config/*
```

### Styling Conventions

- Tailwind utilities throughout; minimal custom CSS
- Custom colors defined in `src/styles/global.css` as CSS variables:
  - `--color-ccesz-primary: #873701`
  - `--color-ccesz-header: #f86c05`
  - `--color-ccesz-dark: hsl(28, 77%, 29%)`
- Page background: `#fff7e8` (cream), set in `MainLayout`

### Animations

GSAP is used in `src/components/pages/index/hero.astro`. The pattern:
- Entry animations: timeline with staggered elements on page load
- Scroll effects: ScrollTrigger for parallax on the hero image
- Marquee: `gsap.to` with `repeat: -1` for the values bar

Always load GSAP in a client `<script>` block within the component.

### Image Optimization

Use Astro's `<Image>` component from `astro:assets` with `format="avif"` or `"webp"`, `quality={85}`. Hero images use `loading="eager"`; others default to lazy.