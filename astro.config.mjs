// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import rehypeQuoteAuthor from './src/plugins/rehype-quote-author.ts';
import rehypeBibliography from './src/plugins/rehype-bibliography.ts';
import rehypeExternalLinks from './src/plugins/rehype-external-links.ts';
import remarkGfm from 'remark-gfm';
import pagefind from 'astro-pagefind';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
    site: 'https://sample-site.com',
    output: 'server',
    adapter: vercel({
        edgeMiddleware: false,
        imageService: true,
    }),
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
                mdi: ['chevron-down'],
                'material-symbols': ['menu-rounded', 'close-rounded'],
                bi: ['rss-fill', 'instagram', 'threads', 'facebook'],
                'fa7-solid': ['ban'],
            },
        }),
        pagefind(),
        sentry({
            sourceMapsUploadOptions: {
                project: process.env.SENTRY_PROJECT,
                org: process.env.SENTRY_ORG,
                authToken: process.env.SENTRY_AUTH_TOKEN,
            },
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});
