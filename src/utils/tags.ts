import type { CollectionEntry } from 'astro:content';

/**
 * Get all unique tags from blog posts
 */
export function getUniqueTags(posts: CollectionEntry<'blog'>[]): string[] {
    const tags = new Set<string>();
    posts.forEach((post) => {
        post.data.tags?.forEach((tag) => {
            tags.add(tag.toLowerCase());
        });
    });
    return Array.from(tags).sort();
}

/**
 * Get posts filtered by tag
 */
export function getPostsByTag(
    posts: CollectionEntry<'blog'>[],
    tag: string,
): CollectionEntry<'blog'>[] {
    return posts.filter((post) =>
        post.data.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
}

/**
 * Get tag count map
 */
export function getTagCounts(posts: CollectionEntry<'blog'>[]): Map<string, number> {
    const counts = new Map<string, number>();
    posts.forEach((post) => {
        post.data.tags?.forEach((tag) => {
            const lowerTag = tag.toLowerCase();
            counts.set(lowerTag, (counts.get(lowerTag) || 0) + 1);
        });
    });
    return counts;
}
