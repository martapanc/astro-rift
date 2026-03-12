export const SITE_TITLE = 'AstroRift';
export const SITE_DESCRIPTION =
    '<span>A Wordpress Theme re-engineered with Astro & React</span>';
export const SITE_DESCRIPTION_PLAIN = 'A Wordpress Theme re-engineered with Astro & React';
export const SITE_LANG = 'en';

// Pagination
export const PAGE_SIZE = 3;

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
            { name: 'How To', url: '/category/how-to' },
        ],
    }
];

export const social = [
    {
        name: 'instagram',
        url: 'https://www.instagram.com',
        icon: 'bi:instagram',
    },
    {
        name: 'threads',
        url: 'https://www.threads.com',
        icon: 'bi:threads',
    },
    {
        name: 'facebook',
        url: 'https://www.facebook.com',
        icon: 'bi:facebook',
    },
];

export const cookieBannerEnabled = false;
