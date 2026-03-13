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
- **Analytics** — Cloudflare Web Analytics (optional)
- **Static output** — deploys to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | Astro 5                             |
| UI         | React 19                            |
| Styling    | Tailwind CSS 4                      |
| Markdown   | MDX, remark-gfm                     |
| Search     | Pagefind                            |
| Icons      | MDI + Phosphor via Iconify          |
| Analytics  | Cloudflare Web Analytics (optional) |
| Deployment | Any static host                     |

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
    { name: 'instagram', url: 'https://www.instagram.com/yourhandle', icon: 'mdi:instagram' },
];
```

### Environment variables

Copy `.env.example` to `.env` and fill in the values you need:

```sh
cp .env.example .env
```

| Variable                            | Purpose                                     |
|-------------------------------------|---------------------------------------------|
| `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | Cloudflare Web Analytics beacon (optional)  |

All variables are optional.

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
│   └── BlogLayout.astro  # Main layout with sidebar
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

AstroRift outputs static HTML at build time (`output: 'static'`) with no server-side adapter required. It deploys to any static host:

- **Netlify** — connect your repository and set build command `yarn build`, publish directory `dist`
- **Vercel** — same: build command `yarn build`, output directory `dist`
- **Cloudflare Pages**, **GitHub Pages**, or any CDN — same dist output works everywhere

See the [Astro deployment docs](https://docs.astro.build/en/guides/deploy/) for platform-specific guides.

## Color Scheme

The theme uses CSS custom properties mapped into Tailwind via `@theme`. Edit `src/styles/global.css` to change the palette.

| Variable       | Light                                                              | Dark                                                               |
|----------------|--------------------------------------------------------------------|--------------------------------------------------------------------|
| `--primary`    | `#5b21b6` ![#5b21b6](https://placehold.co/15x15/5b21b6/5b21b6.png) | `#f59e0b` ![#f59e0b](https://placehold.co/15x15/f59e0b/f59e0b.png) |
| `--accent`     | `#7537e1` ![#7537e1](https://placehold.co/15x15/7537e1/7537e1.png) | `#ffbf04` ![#ffbf04](https://placehold.co/15x15/ffbf04/ffbf04.png)                                                         |
| `--background` | `#faf7ff` ![#faf7ff](https://placehold.co/15x15/faf7ff/faf7ff.png) | `#0d0a15` ![#0d0a15](https://placehold.co/15x15/0d0a15/0d0a15.png)                                                         |
| `--text`       | `#4a3f5c` ![#4a3f5c](https://placehold.co/15x15/4a3f5c/4a3f5c.png) | `#e8e0f5` ![#e8e0f5](https://placehold.co/15x15/e8e0f5/e8e0f5.png)                                                         |