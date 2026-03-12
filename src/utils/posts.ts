import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Get all blog posts, filtering drafts based on environment
 * - In development: shows all posts (including drafts)
 * - In Vercel preview (test): shows all posts (including drafts)
 * - In production: shows only published posts (excludes drafts)
 */
export async function getBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
    const allPosts = await getCollection('blog');
    const isPreview = process.env.VERCEL_ENV === 'preview';
    return allPosts.filter((post) => import.meta.env.DEV || isPreview || !post.data.draft);
}
