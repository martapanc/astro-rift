import { type ReactNode } from 'react';
import clsx from 'clsx';
import { Breadcrumbs } from '@/components/nav/Breadcrumbs.tsx';

export function Box({
    children,
    className,
    id,
}: {
    children: ReactNode;
    className?: string;
    id?: string;
}) {
    return (
        <div
            id={id}
            className={clsx(
                'light:border light:border-border bg-background2 rounded-lg p-4 shadow-md',
                className,
            )}
        >
            {children}
        </div>
    );
}

export function SidebarBox({
    title,
    children,
    className,
}: {
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <Box className={className}>
            <h2 className="font-header wp-block-heading mb-5 py-1 text-xl font-semibold">
                {title}
            </h2>

            {children}
        </Box>
    );
}

export function CategoryBox({ category, postsLength }: { category: string; postsLength: number }) {
    const breadcrumbs = [{ label: 'Homepage', href: '/' }, { label: category }];

    return (
        <Box className="mb-7 px-5">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex flex-col text-center sm:text-start">
                    <h1 className="font-header text-3xl font-bold">{category}</h1>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {postsLength} {postsLength === 1 ? 'articolo' : 'articoli'}
                    </span>
                </div>
                <Breadcrumbs items={breadcrumbs} />
            </div>
        </Box>
    );
}

export function TagBox({ tag, postsLength }: { tag: string; postsLength: number }) {
    const breadcrumbs = [{ label: 'Homepage', href: '/' }, { label: `#${tag}` }];

    return (
        <Box className="mb-7 px-5">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex flex-col text-center sm:text-start">
                    <h1 className="font-header text-3xl font-bold">#{tag}</h1>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {postsLength} {postsLength === 1 ? 'articolo' : 'articoli'}
                    </span>
                </div>
                <Breadcrumbs items={breadcrumbs} />
            </div>
        </Box>
    );
}

export function PageTitleBox({ title }: { title: string }) {
    const breadcrumbs = [{ label: 'Homepage', href: '/' }, { label: title }];

    return (
        <Box className="mb-7 px-5">
            <div className="flex flex-col items-center justify-between gap-x-4 gap-y-2 sm:flex-row">
                <div className="flex flex-col text-center sm:text-start">
                    <h1 className="font-header text-4xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h1>
                </div>
                <Breadcrumbs items={breadcrumbs} />
            </div>
        </Box>
    );
}

export function BreadcrumbsBox({ items }: { items: { label: string; href?: string }[] }) {
    return (
        <Box className="mb-5 px-5 lg:mb-7">
            <Breadcrumbs items={items} />
        </Box>
    );
}

export function ListItem({ last, children }: { last: boolean; children: ReactNode }) {
    return (
        <li className={clsx('px-1.5 pb-3.5 text-base', !last && 'border-border mb-3.5 border-b')}>
            {children}
        </li>
    );
}
