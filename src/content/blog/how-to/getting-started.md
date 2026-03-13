---
title: Getting Started with AstroRift
category: How-To
pubDate: 2026-03-13
heroImage: '@/assets/how-to/getting-started-with-astrorift/heroImage.png'
tags: astro, getting started, template, how to
draft: false
featured: true
featuredRank: 2
---

Welcome to **AstroRift** — a WordPress-inspired blog theme re-engineered from the ground up with [Astro 5](https://astro.build) and React 19.

If you've ever loved the structure of a classic WordPress blog but wanted something faster, more modern, and easier to own, this is the template for you.

## What's included

AstroRift ships with everything a content-focused blog needs:

- **Dark mode** — a toggle in the header switches between a purple light theme and an amber dark theme, persisted across page loads
- **Full-text search** — powered by [Pagefind](https://pagefind.app), built at deploy time, no backend required
- **Featured posts slideshow** — mark any post as `featured` and it appears in the home page carousel
- **Sidebar widgets** — categories, tags, monthly archives, latest articles, and search, all generated from your content automatically
- **Post navigation** — links to the previous and next post within the same category appear at the bottom of every article
- **Reading time** — calculated automatically from the post word count
- **SEO** — Open Graph tags, JSON-LD `BlogPosting` schema, sitemap, and robots.txt generated at build time
- **Analytics** — optional [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) integration

## Writing your first post

Create a Markdown (or MDX) file anywhere under `src/content/blog/`. Subdirectories are for your own organisation — they don't affect the URL.

```md
---
title: My First Post
category: My Category
pubDate: 2026-03-11
tags: hello, world
heroImage: '@/assets/my-post/heroImage.png'
draft: false
---

Your content goes here.
```

The `heroImage` field is optional — a fallback image is used when it's absent. Set `draft: true` while you're writing; draft posts are visible in development but hidden in production.

## Customising the site

Open `src/consts.ts` to change the site title, description, navigation menu, and social links. That single file controls the branding and structure of the whole site.

For the color scheme, everything lives in `src/styles/global.css` as CSS custom properties. The light mode uses purples and the dark mode switches to ambers — swap in any palette you like.

### Language and UI strings

`src/consts.ts` also contains two exports for localisation. `SITE_LOCALE` is a BCP 47 tag that controls how dates are formatted across the site (using the native `Intl.DateTimeFormat` API). The `ui` object holds every interface string — sidebar titles, pagination labels, share widget copy, 404 messages, and more — all in one place.

To switch language, change the locale and replace the strings:

```ts
export const SITE_LOCALE = 'fr-FR';

export const ui = {
    pagination: { previous: 'Précédent', next: 'Suivant', ... },
    post: { readingTime: 'Temps de lecture', readingTimeUnit: 'minutes', ... },
    // ...
};
```

No component files need to be touched — the changes propagate automatically.

## Deployment

AstroRift outputs static HTML at build time — no server required. It deploys to any static host with the same two settings: build command `yarn build`, publish directory `dist`.

Popular options include [Netlify](https://netlify.com), [Vercel](https://vercel.com), [Cloudflare Pages](https://pages.cloudflare.com), and [GitHub Pages](https://pages.github.com). If you want Cloudflare Web Analytics, copy `.env.example` to `.env` and add your beacon token.

## Going further

- Add posts in MDX to mix in React components alongside Markdown
- Use the `featured` and `featuredRank` frontmatter fields to curate the home page slideshow
- Explore the `src/plugins/` directory for the custom rehype plugins that handle bibliography citations and quote attribution
- Run `yarn test:e2e` to execute the Playwright suite before deploying

Happy blogging!