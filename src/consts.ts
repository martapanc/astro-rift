export const SITE_TITLE = 'AstroRift';
export const SITE_DESCRIPTION =
    '<span>A Wordpress Theme re-engineered with Astro & React</span>';
export const SITE_DESCRIPTION_PLAIN = 'A Wordpress Theme re-engineered with Astro & React';
export const SITE_LANG = 'en';

// Locale used for date formatting (Intl.DateTimeFormat)
// Change to any valid BCP 47 tag, e.g. 'it-IT', 'fr-FR', 'de-DE'
export const SITE_LOCALE = 'en-GB';

// Pagination
export const PAGE_SIZE = 4;

// UI strings — edit these to translate the interface
export const ui = {
    nav: {
        toggleMenu: 'Toggle menu',
        toggleDarkMode: 'Toggle dark mode',
        rss: 'Feed RSS',
    },
    sidebar: {
        categories: 'Categories',
        tags: 'Tags',
        archives: 'Archives',
        latestArticles: 'Latest Articles',
        search: 'Search',
        randomArticleOr: '...or ',
        randomArticle: 'read a random article',
    },
    post: {
        readingTime: 'Reading time',
        readingTimeUnit: 'minutes',
        previousArticle: 'Previous article',
        nextArticle: 'Next article',
        shareArticle: 'Share article',
        copyLink: 'Copy link',
        copied: 'Copied!',
        copy: 'Copy',
        monthAriaLabel: 'month',
        categoryAriaLabel: 'Category',
    },
    postList: {
        oldestFirst: 'Oldest first',
        newestFirst: 'Newest first',
    },
    latestPosts: {
        title: 'Latest articles',
    },
    slideshow: {
        title: 'Highlights',
        previousSlide: 'Previous slide',
        nextSlide: 'Next slide',
    },
    pagination: {
        previous: 'Previous',
        next: 'Next',
        page: 'Page',
    },
    backToTop: 'Back to top',
    notFound: {
        title: '404 - Page not found',
        description: 'The page you are looking for does not exist.',
        heading: 'Oops! Not found',
        body: "The page you've been looking for doesn't seem to exist",
        goBack: 'Go Back',
    },
};

export const email = 'test@email.com';

export type MenuItem = {
    name: string;
    url?: string;
    children?: { name: string; url?: string }[];
};

export const menu: MenuItem[] = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'Sample page',
        url: '/sample-page',
    },
    {
        name: 'Categories',
        children: [
            { name: 'Welcome', url: '/category/welcome' },
            { name: 'How-To', url: '/category/how-to' },
        ],
    },
    {
        name: 'Source Code',
        url: 'https://github.com/martapanc/astro-rift',
    }
];

export const social = [
    {
        name: 'instagram',
        url: 'https://www.instagram.com',
        icon: 'mdi:instagram',
    },
    {
        name: 'threads',
        url: 'https://www.threads.com',
        icon: 'mdi:at',
    },
    {
        name: 'facebook',
        url: 'https://www.facebook.com',
        icon: 'mdi:facebook',
    },
    {
        name: 'X',
        url: 'https://x.com',
        icon: 'ph:x-logo',
    },
];
