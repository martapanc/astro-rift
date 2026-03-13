// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import react from '@astrojs/react';
import rehypeQuoteAuthor from './src/plugins/rehype-quote-author.ts';
import rehypeBibliography from './src/plugins/rehype-bibliography.ts';
import rehypeExternalLinks from './src/plugins/rehype-external-links.ts';
import remarkGfm from 'remark-gfm';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
    site: 'https://sample-site.com',
    output: 'static',
    markdown: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeQuoteAuthor, rehypeBibliography, rehypeExternalLinks],
    },
    integrations: [
        mdx(),
        sitemap(),
        react(),
        icon({
            include: {
                mdi: ['chevron-down', 'menu', 'close', 'rss', 'instagram', 'facebook', 'at', 'cancel'],
                ph: ['x-logo'],
            },
        }),
        pagefind(),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});
