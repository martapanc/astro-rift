import type { CollectionEntry } from 'astro:content';

/**
 * Get all unique categories from blog posts
 */
export function getUniqueCategories(posts: CollectionEntry<'blog'>[]): string[] {
    const categories = new Set(posts.map((post) => post.data.category.toLowerCase()));
    return Array.from(categories).sort();
}

/**
 * Get posts filtered by category
 */
export function getPostsByCategory(
    posts: CollectionEntry<'blog'>[],
    category: string,
): CollectionEntry<'blog'>[] {
    return posts.filter((post) => post.data.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get category count map
 */
export function getCategoryCounts(posts: CollectionEntry<'blog'>[]): Map<string, number> {
    const counts = new Map<string, number>();
    posts.forEach((post) => {
        const category = post.data.category;
        counts.set(category, (counts.get(category) || 0) + 1);
    });
    return counts;
}
