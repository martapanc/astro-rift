import type { CollectionEntry } from 'astro:content';

export interface PostNavigation {
    prev: CollectionEntry<'blog'> | null;
    next: CollectionEntry<'blog'> | null;
}

/**
 * Get previous and next posts within the same category
 * @param currentPost - The current post
 * @param allPosts - All blog posts
 * @returns Object with prev (older) and next (newer) posts
 */
export function getCategoryNavigation(
    currentPost: CollectionEntry<'blog'>,
    allPosts: CollectionEntry<'blog'>[],
): PostNavigation {
    // Filter posts by same category and sort by date (oldest first)
    const categoryPosts = allPosts
        .filter(
            (post) =>
                post.data.category.toLowerCase() === currentPost.data.category.toLowerCase() &&
                post.id !== currentPost.id,
        )
        .sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());

    const currentDate = currentPost.data.pubDate.valueOf();

    // Split posts into older and newer
    const olderPosts = categoryPosts.filter((post) => post.data.pubDate.valueOf() < currentDate);
    const newerPosts = categoryPosts.filter((post) => post.data.pubDate.valueOf() > currentDate);

    // Find prev (older) - the most recent post that's older than current (last in olderPosts)
    const prev = olderPosts.length > 0 ? olderPosts[olderPosts.length - 1] : null;

    // Find next (newer) - the oldest post that's newer than current (first in newerPosts)
    const next = newerPosts.length > 0 ? newerPosts[0] : null;

    return { prev, next };
}
