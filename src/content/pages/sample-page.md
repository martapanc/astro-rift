---
title: Sample Page
description: A demonstration of what a static page looks like in AstroRift — no sidebar, no post metadata, just content.
---

This is a **static page** — distinct from a blog post in a few key ways: there's no publish date, no category, no reading time, and no sidebar. It's a clean canvas for content that doesn't fit the chronological flow of a blog, such as an about page, a portfolio, a contact page, or a colophon.

Pages live in `src/content/pages/` as Markdown files and are rendered at `/{slug}` automatically.

---

## About this site

AstroRift is a blog template built with [Astro 5](https://astro.build) and React. It was designed to capture the structure and feel of a classic WordPress blog, then re-engineer it from scratch with a modern stack: no PHP, no database, no plugin ecosystem to maintain — just files, components, and a build step.

The result is a site that loads fast, deploys anywhere, and is entirely owned by whoever runs it.

## What makes it different

| Feature | WordPress | AstroRift |
|---|---|---|
| Rendering | Server-side PHP | Static HTML at build time |
| Database | MySQL required | None — content is Markdown files |
| Search | Plugin required | Built-in via Pagefind |
| Dark mode | Plugin required | Built-in |
| Hosting | Needs PHP host | Any static host or Vercel |
| Performance | Varies | Fast by default |

## Writing content

All content — posts and pages alike — is written in Markdown or MDX. Frontmatter handles metadata. There's no admin panel, no WYSIWYG editor, and no login screen. A text editor and a terminal are all you need.

Posts support:

- **Categories** and **tags** for organisation
- **Featured** flag to include a post in the home page slideshow
- **Draft** flag to hide a post in production while you're still writing
- **Hero images** with automatic optimisation
- **Reading time** calculated from word count
- **Footnotes**, **blockquotes with attribution**, and **bibliography** citations

## Who this is for

AstroRift is a good fit if you:

- Want to own your content as plain text files in a git repository
- Are comfortable with a terminal and a code editor
- Want good performance and SEO without configuring plugins
- Plan to customise the design — fonts, colours, layout — directly in code

It's probably not the right tool if you need a visual editor, multiple authors with role-based permissions, or a large plugin ecosystem.

---

*This page is part of the AstroRift template. Replace its content with whatever suits your site — an about page, a now page, a contact page, or something else entirely.*

