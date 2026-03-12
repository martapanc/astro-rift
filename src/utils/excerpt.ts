import type { CollectionEntry } from 'astro:content';

/**
 * Strips the Bibliografia and Note sections from markdown content
 * These sections start with ## Bibliografia or ## Note and continue to the end
 */
export function stripEndSections(content: string): string {
    // Match ## Bibliografia or ## Note (case insensitive) and everything after
    return content.replace(/^##\s+(Bibliografia|Note)\b[\s\S]*$/im, '').trim();
}

/**
 * Extracts the first N words from markdown content, stripping markdown syntax
 */
export function getExcerpt(content: string, wordCount: number = 30): string {
    // Remove markdown syntax (headings, links, images, bold, italic, etc.)
    const text = content
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Remove inline code
        .replace(/`[^`]+`/g, '')
        // Remove images
        .replace(/!\[.*?\]\(.*?\)/g, '')
        // Remove links but keep text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove headings
        .replace(/#{1,6}\s+/g, '')
        // Remove bold/italic
        .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
        // Remove HTML tags
        .replace(/<[^>]+>/g, '')
        // Normalize whitespace
        .replace(/\s+/g, ' ')
        .trim();

    // Split into words and take first N
    const words = text.split(/\s+/).slice(0, wordCount);

    // Join and add ellipsis if content was truncated
    const excerpt = words.join(' ');
    return text.split(/\s+/).length > wordCount ? `${excerpt}...` : excerpt;
}

/**
 * Gets the post excerpt, using the frontmatter excerpt if available,
 * otherwise auto-generating from the first 30 words of the body
 */
export function getPostExcerpt(post: CollectionEntry<'blog'>): string {
    return post.data.excerpt || getExcerpt(post.body!, 30);
}
