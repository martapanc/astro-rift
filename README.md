# AstroRift

A WordPress-inspired blog theme re-engineered with Astro 5 & React — fast, fully-featured, and ready to deploy.

## Features

- **Astro 5 + React 19** — island architecture for optimal performance
- **MDX support** — mix Markdown with React components in your posts
- **Dark mode** — class-based toggle with smooth transitions
- **Full-text search** — powered by Pagefind, works without a backend
- **Featured posts slideshow** — auto-rotating carousel on the home page
- **Sidebar widgets** — categories, tags, archives, latest articles, search box
- **Post navigation** — previous/next links scoped to the same category
- **Open Graph + JSON-LD** — structured metadata for SEO and social sharing
- **Sitemap & robots.txt** — generated automatically at build time
- **Reading time** — calculated per post
- **Bibliography support** — custom rehype plugin for academic-style citations
- **Contact form** — built with Formik + Yup, sends via Resend
- **Analytics** — Cloudflare Web Analytics (optional)
- **Error tracking** — Sentry with source map upload (optional)
- **Vercel deployment** — adapter and edge config included

## Tech Stack

| Layer          | Technology               |
|----------------|--------------------------|
| Framework      | Astro 5                  |
| UI             | React 19                 |
| Styling        | Tailwind CSS 4           |
| Markdown       | MDX, remark-gfm          |
| Search         | Pagefind                 |
| Forms          | Formik + Yup             |
| Email          | Resend                   |
| Analytics      | Cloudflare Web Analytics |
| Error tracking | Sentry                   |
| Deployment     | Vercel                   |

## Getting Started

```sh
# Fork & Clone the repo
git clone https://github.com/your-username/astro-rift.git
cd astro-rift

# Install dependencies
yarn install

# Start the dev server
yarn dev
```

The dev server runs at `http://localhost:4321`.

## Configuration

### Site settings

Edit `src/consts.ts` to configure the site title, description, navigation menu, and social links:

```ts
export const SITE_TITLE = 'AstroRift';
export const SITE_DESCRIPTION_PLAIN = 'A Wordpress Theme re-engineered with Astro & React';

export const menu: MenuItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Categories', children: [
        { name: 'My Category', url: '/category/my-category' },
    ]},
];

export const social = [
    { name: 'instagram', url: 'https://www.instagram.com/yourhandle', icon: 'bi:instagram' },
];
```

### Environment variables

Copy `.env.example` to `.env` and fill in the values you need:

```sh
cp .env.example .env
```

| Variable                            | Purpose                                     |
|-------------------------------------|---------------------------------------------|
| `RESEND_API_KEY`                    | Contact form email delivery                 |
| `RESEND_FROM_EMAIL`                 | Sender address (must be verified in Resend) |
| `RESEND_TO_EMAIL`                   | Where contact form submissions are sent     |
| `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | Cloudflare Web Analytics beacon             |
| `PUBLIC_SENTRY_DSN`                 | Sentry client-side error tracking           |
| `SENTRY_PROJECT`                    | Sentry project name                         |
| `SENTRY_AUTH_TOKEN`                 | Sentry source map upload token              |

All variables are optional — features degrade gracefully when keys are absent.

## Writing Posts

Create a `.md` or `.mdx` file anywhere under `src/content/blog/`. Subdirectories are used for organisation only — they do not affect the URL slug.

```md
---
title: My Post Title
category: How-To
pubDate: 2026-03-12
tags: astro, web dev, tutorial
heroImage: '@/assets/my-post/heroImage.png'
excerpt: Optional custom excerpt — auto-generated from content if omitted.
draft: false
featured: false
---

Your post content here...
```

### Frontmatter reference

| Field          | Type               | Required | Notes                                            |
|----------------|--------------------|----------|--------------------------------------------------|
| `title`        | string             | yes      |                                                  |
| `category`     | string             | yes      | Used for grouping and navigation                 |
| `pubDate`      | date               | yes      |                                                  |
| `tags`         | string or string[] | no       | Comma-separated string or array                  |
| `heroImage`    | image              | no       | Use `@/assets/...` path                          |
| `excerpt`      | string             | no       | Auto-generated from first 30 words if omitted    |
| `updatedDate`  | date               | no       | Shown alongside publish date                     |
| `draft`        | boolean            | no       | Defaults to `false`; drafts hidden in production |
| `featured`     | boolean            | no       | Includes post in home page slideshow             |
| `featuredRank` | number             | no       | Controls order in the featured slideshow         |

## Project Structure

```
src/
├── assets/              # Images referenced from content
├── components/
│   ├── blog/            # PostPreview, PostList, LatestPostsGrid, PostHeader, etc.
│   ├── home/            # FeaturedSlideshow
│   ├── nav/             # Header, Footer, Breadcrumbs, DarkModeToggle
│   ├── sidebar/         # Categories, Tags, Archives, LatestArticles, SearchBox
│   └── shared/          # Box, Pagination
├── content/
│   ├── blog/            # Blog posts (.md / .mdx)
│   └── pages/           # Static pages (.md / .mdx)
├── layouts/
│   ├── BlogLayout.astro  # Main layout with sidebar
│   └── PageLayout.astro  # Standalone page layout
├── pages/               # File-based routes
├── plugins/             # Custom rehype plugins
├── styles/
│   └── global.css       # Tailwind theme + CSS variables
├── utils/               # posts, categories, tags, archives, images, excerpts
└── consts.ts            # Site-wide configuration
```

## Commands

| Command           | Action                               |
|-------------------|--------------------------------------|
| `yarn dev`        | Start dev server at `localhost:4321` |
| `yarn build`      | Build production site to `./dist/`   |
| `yarn preview`    | Preview the production build locally |
| `yarn lint`       | Run ESLint                           |
| `yarn lint:fix`   | Run ESLint with auto-fix             |
| `yarn format`     | Format all files with Prettier       |
| `yarn type-check` | Run Astro type checker               |
| `yarn test:e2e`   | Run Playwright end-to-end tests      |

## Deployment

The project is configured for Vercel out of the box. Push to your repository and connect it to a Vercel project — no additional configuration is required.

For other platforms, swap the adapter in `astro.config.mjs`. See the [Astro deployment docs](https://docs.astro.build/en/guides/deploy/) for options.

## Color Scheme

The theme uses CSS custom properties mapped into Tailwind via `@theme`. Edit `src/styles/global.css` to change the palette.

| Variable       | Light              | Dark              |
|----------------|--------------------|-------------------|
| `--primary`    | `#5b21b6` (purple) | `#f59e0b` (amber) |
| `--accent`     | `#7537e1`          | `#ffbf04`         |
| `--background` | `#faf7ff`          | `#0d0a15`         |
| `--text`       | `#4a3f5c`          | `#e8e0f5`         |