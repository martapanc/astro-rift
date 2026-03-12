export interface Book {
    title: string;
    authors: string;
    year: string;
    publisher?: string;
    isbn13?: string;
    categories: string[];
    languages: string[];
    coverImageUrl: string;
    infoLink: string;
    summary: string;

    authorSortName: string;
}

export interface BookFilters {
    category?: string;
    author?: string;
    language?: string;
    search?: string;
}
