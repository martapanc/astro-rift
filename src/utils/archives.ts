import type { CollectionEntry } from 'astro:content';
import { format, getYear, getMonth, isSameMonth, isSameYear } from 'date-fns';
import { enGB } from 'date-fns/locale';

/**
 * Format a date to YYYY/MM path format
 */
export function getMonthArchiveUrl(date: Date): string {
    return `/${format(date, 'yyyy/MM')}`;
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
        const year = getYear(date);
        const month = getMonth(date) + 1; // getMonth is 0-indexed
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
    const targetDate = new Date(year, month - 1, 1);

    return posts.filter((post) => {
        const postDate = post.data.pubDate;
        return isSameMonth(postDate, targetDate) && isSameYear(postDate, targetDate);
    });
}

/**
 * Get the formatted month name the chosen locale
 */
export function getMonthName(month: number): string {
    const date = new Date(2000, month - 1, 1);
    return format(date, 'MMMM', { locale: enGB });
}

/**
 * Get all unique years from posts
 */
export function getUniqueYears(posts: CollectionEntry<'blog'>[]): number[] {
    const yearsSet = new Set<number>();

    posts.forEach((post) => {
        yearsSet.add(getYear(post.data.pubDate));
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
    return posts.filter((post) => getYear(post.data.pubDate) === year);
}
