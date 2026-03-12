import type { Book, BookFilters } from '@/types/book';

/**
 * Generate CSV content from books array
 */
export function generateBooksCSV(books: Book[]): string {
    const headers = [
        'Titolo',
        'Autore',
        'Anno',
        'Editore',
        'ISBN-13',
        'Categorie',
        'Lingue',
        'Riassunto',
        'Link',
    ];

    const escapeCSV = (value: unknown): string => {
        if (value === null || value === undefined) return '';
        const str = String(value);
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const rows = books.map((book) =>
        [
            escapeCSV(book.title),
            escapeCSV(book.authors),
            escapeCSV(book.year),
            escapeCSV(book.publisher),
            escapeCSV(book.isbn13),
            escapeCSV(book.categories.join('; ')),
            escapeCSV(book.languages.join('; ')),
            escapeCSV(book.summary),
            escapeCSV(book.infoLink),
        ].join(','),
    );

    return [headers.join(','), ...rows].join('\n');
}

/**
 * Trigger CSV download in browser
 */
export function downloadBooksCSV(books: Book[], filename = 'libri.csv'): void {
    console.log('Downloading CSV...');
    const csv = generateBooksCSV(books);
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' }); // BOM for Excel
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Get all unique categories from books with counts
 */
export function getBookCategories(books: Book[]): { name: string; count: number }[] {
    const categoryMap = new Map<string, number>();

    books.forEach((book) => {
        if (book.categories) {
            book.categories.forEach((cat) => {
                const trimmed = cat.trim();
                if (trimmed) {
                    categoryMap.set(trimmed, (categoryMap.get(trimmed) || 0) + 1);
                }
            });
        }
    });

    return Array.from(categoryMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all unique languages from books with counts
 */
export function getBookLanguages(books: Book[]): { name: string; count: number }[] {
    const languageMap = new Map<string, number>();

    books.forEach((book) => {
        if (book.languages) {
            const langs = book.languages;
            if (langs) {
                langs.forEach((lang) => languageMap.set(lang, (languageMap.get(lang) || 0) + 1));
            }
        }
    });

    return Array.from(languageMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Get all unique authors from books with counts
 */
export function getBookAuthors(books: Book[]): { name: string; count: number }[] {
    const authorMap = new Map<string, { count: number; sortName: string }>();

    books.forEach((book) => {
        if (book.authors) {
            // Authors might be separated by semicolons
            const authorList = book.authors
                .split(/;/)
                .map((a) => a.trim())
                .filter(Boolean);
            authorList.forEach((author, index) => {
                const existing = authorMap.get(author);
                // Use book.authorSortName for the first author, fallback to last word of name
                const sortName =
                    index === 0 && book.authorSortName
                        ? book.authorSortName
                        : author.split(/\s+/).pop() || author;

                if (existing) {
                    existing.count += 1;
                } else {
                    authorMap.set(author, { count: 1, sortName });
                }
            });
        }
    });

    return Array.from(authorMap.entries())
        .map(([name, { count, sortName }]) => ({ name, count, sortName }))
        .sort((a, b) => a.sortName.localeCompare(b.sortName));
}

/**
 * Filter books based on query parameters
 */
export function filterBooks(books: Book[], filters: BookFilters): Book[] {
    return books.filter((book) => {
        if (filters.category) {
            const bookCategories = book.categories.map((c) => c.toLowerCase());
            if (!bookCategories.includes(filters.category.toLowerCase())) {
                return false;
            }
        }

        if (filters.author) {
            const bookAuthors = book.authors.toLowerCase();
            if (!bookAuthors.includes(filters.author.toLowerCase())) {
                return false;
            }
        }

        if (filters.language) {
            const bookLanguages = book.languages.map((l) => l.toLowerCase());
            if (!bookLanguages.includes(filters.language.toLowerCase())) {
                return false;
            }
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const title = book.title.toLowerCase();
            const authors = book.authors.toLowerCase();
            if (!title.includes(searchTerm) && !authors.includes(searchTerm)) {
                return false;
            }
        }

        return true;
    });
}

/**
 * Build filter URL with current filters
 */
export function buildBookFilterUrl(baseUrl: string, filters: BookFilters): string {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.author) params.set('author', filters.author);
    if (filters.language) params.set('language', filters.language);
    if (filters.search) params.set('search', filters.search);

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
