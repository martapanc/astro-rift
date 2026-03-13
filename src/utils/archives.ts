import type { CollectionEntry } from 'astro:content';
import { SITE_LOCALE } from '@/consts.ts';

/**
 * Format a date to YYYY/MM path format
 */
export function getMonthArchiveUrl(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `/${year}/${month}`;
}

/**
 * Get all unique year/month combinations from posts
 */
export function getUniqueMonths(
    posts: CollectionEntry<'blog'>[],
): Array<{ year: number; month: number }> {
    const monthsSet = new Set<string>();

    posts.forEach((post) => {
        const date = post.data.pubDate;
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth is 0-indexed
        monthsSet.add(`${year}-${month}`);
    });

    return Array.from(monthsSet)
        .map((key) => {
            const [year, month] = key.split('-').map(Number);
            return { year, month };
        })
        .sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year; // Descending year
            return b.month - a.month; // Descending month
        });
}

/**
 * Get posts filtered by year and month
 */
export function getPostsByMonth(
    posts: CollectionEntry<'blog'>[],
    year: number,
    month: number,
): CollectionEntry<'blog'>[] {
    return posts.filter((post) => {
        const d = post.data.pubDate;
        return d.getFullYear() === year && d.getMonth() + 1 === month;
    });
}

/**
 * Get the formatted month name in the configured locale
 */
export function getMonthName(month: number): string {
    const date = new Date(2000, month - 1, 1);
    return new Intl.DateTimeFormat(SITE_LOCALE, { month: 'long' }).format(date);
}

/**
 * Get all unique years from posts
 */
export function getUniqueYears(posts: CollectionEntry<'blog'>[]): number[] {
    const yearsSet = new Set<number>();

    posts.forEach((post) => {
        yearsSet.add(post.data.pubDate.getFullYear());
    });

    return Array.from(yearsSet).sort((a, b) => b - a); // Descending order
}

/**
 * Get posts filtered by year
 */
export function getPostsByYear(
    posts: CollectionEntry<'blog'>[],
    year: number,
): CollectionEntry<'blog'>[] {
    return posts.filter((post) => post.data.pubDate.getFullYear() === year);
}
