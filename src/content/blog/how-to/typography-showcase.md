---
title: Typography Showcase
category: How-To
pubDate: 2026-03-12
tags: typography, markdown, reference
heroImage: '@/assets/fallback-image.jpg'
excerpt: A reference post demonstrating every typographic element available in AstroRift — headings, lists, code, quotes, tables, footnotes, bibliography, and more.
draft: false
featured: false
---

This post is a visual reference for every typographic element you can use in an AstroRift post. Write your content in standard Markdown (or MDX), and the template handles the rest.

---

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

> Note: `h1` is reserved for the post title. Use `h2` through `h6` in your post body.

---

## Inline text styles

Regular paragraph text. **Bold text** draws attention to key points. *Italic text* is used for emphasis, titles, or foreign terms. ***Bold and italic*** can be combined. ~~Strikethrough~~ marks something as removed or incorrect.

Inline `code` renders in a monospace font and is useful for variable names, file paths, and short snippets.

---

## Links

[Internal link to the home page](/) opens within the site. [External links](https://astro.build) receive a distinct cursor style and open as expected by the browser. You can also use [reference-style links][astro-docs] defined elsewhere in the document.

[astro-docs]: https://docs.astro.build

---

## Blockquotes

A plain blockquote:

> The best way to predict the future is to invent it.

A blockquote with author attribution — place the `---` separator and author name on the last line inside the `>` block:

> The only way to do great work is to love what you do.
> --- Steve Jobs

> What I cannot create, I do not understand.
> --- Richard Feynman, *Surely You're Joking, Mr. Feynman!* (1985)

---

## Lists

### Unordered list

- First item
- Second item
  - Nested item
  - Another nested item
    - Deeply nested
- Third item

### Ordered list

1. Clone the repository
2. Install dependencies
3. Configure your environment
   1. Copy `.env.example` to `.env`
   2. Fill in the required values
4. Run the dev server

### Task list

- [x] Set up the project
- [x] Write the first post
- [ ] Configure deployment
- [ ] Add custom domain

---

## Horizontal rule

Use `---` on its own line to insert a thematic break between sections.

---

## Images

A plain image (renders inside a `<figure>` element):

![AstroRift hero image](@/assets/logo.png)

Add a caption by following the image with italic text on the same line — or use an HTML `<figure>` with `<figcaption>` in an MDX file for full control.

---

## Code blocks

Fenced code blocks support syntax highlighting via Shiki. Specify the language after the opening triple backticks.

**JavaScript**

```js
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('world'));
```

**TypeScript**

```ts
interface Post {
    title: string;
    pubDate: Date;
    tags?: string[];
}

function formatTitle(post: Post): string {
    return `[${post.pubDate.getFullYear()}] ${post.title}`;
}
```

**Astro**

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---

<ul>
    {posts.map(post => (
        <li><a href={`/posts/${post.slug}`}>{post.data.title}</a></li>
    ))}
</ul>
```

**Shell**

```sh
yarn install
yarn dev
```

**CSS**

```css
:root {
    --primary: #5b21b6;
    --background: #faf7ff;
}
```

**JSON**

```json
{
    "title": "My Post",
    "pubDate": "2026-03-12",
    "tags": ["astro", "markdown"]
}
```

---

## Tables

| Element | Markdown syntax | Notes |
|---|---|---|
| Bold | `**text**` | |
| Italic | `*text*` | |
| Strikethrough | `~~text~~` | |
| Inline code | `` `code` `` | |
| Link | `[label](url)` | |
| Image | `![alt](url)` | |
| Footnote | `[^1]` | See below |

Column alignment is controlled with colons in the separator row:

| Left aligned | Center aligned | Right aligned |
|:---|:---:|---:|
| Lorem | ipsum | 1 |
| dolor | sit | 42 |
| amet | consectetur | 100 |

---

## Footnotes

Footnotes are rendered at the bottom of the post with back-links to each reference point.[^1] You can have multiple footnotes in a single post.[^2]

---

## Citations etc.

In-text citations use the `[Author YYYY]` syntax. For example, modern static site performance has been well studied [Smith 2024], and the benefits of Markdown-driven content are widely acknowledged [Doe 2023].

The `## Bibliography` section (exact spelling required) defines the reference list. Each entry starts with `[Author YYYY]` followed by the full citation. Entries are sorted alphabetically and linked back to their in-text citations.

## Bibliography

[Doe 2023] Doe, J. *The Case for Markdown-Driven Content*. Web Publishing Quarterly, 2023.

[Smith 2024] Smith, A. & Jones, B. *Performance Benchmarks for Static Site Generators*. Journal of Web Engineering, 2024.

## Notes

[^1]: This is the first footnote. It can contain **formatted text** and even `inline code`.
[^2]: A second footnote, defined at the bottom of the document but rendered inline in the footnote list.