import type { ReactNode } from 'react';
import clsx from 'clsx';
import { ui } from '@/consts.ts';

export interface PaginationProps {
    currentPage: number;
    lastPage: number;
    urlPattern: string; // Pattern like "/2" or "/category/welcome/2"
}

const navButtonStyles = {
    base: 'bg-background2 flex items-center gap-1 rounded-lg border px-4 py-2 text-black dark:text-white min-w-24',
    active: 'transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-950',
    disabled: 'opacity-55 dark:opacity-50 cursor-default',
};

interface NavButtonProps {
    href?: string;
    disabled?: boolean;
    children: ReactNode;
    ariaLabel: string;
    next?: boolean;
}

function NavButton({ href, disabled, children, ariaLabel, next }: NavButtonProps) {
    const className = clsx(
        navButtonStyles.base,
        disabled ? navButtonStyles.disabled : navButtonStyles.active,
        next && 'justify-end'
    );

    if (disabled || !href) {
        return (
            <span className={className} aria-label={ariaLabel}>
                {children}
            </span>
        );
    }
    return (
        <a href={href} className={className} aria-label={ariaLabel}>
            {children}
        </a>
    );
}

const pageButtonStyles = {
    base: 'flex h-10 w-10 items-center justify-center rounded-lg border text-black dark:text-white',
    active: 'bg-background2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-950',
    current: 'border-[var(--primary)] bg-[var(--primary)] text-white',
};

interface PageButtonProps {
    page: number;
    href?: string;
    isCurrent?: boolean;
}

function PageButton({ page, href, isCurrent }: PageButtonProps) {
    const className = clsx(
        pageButtonStyles.base,
        isCurrent ? pageButtonStyles.current : pageButtonStyles.active,
    );

    if (isCurrent) {
        return (
            <span className={className} aria-label={`${ui.pagination.page} ${page}`} aria-current="page">
                {page}
            </span>
        );
    }
    return (
        <a href={href} className={className} aria-label={`${ui.pagination.page} ${page}`}>
            {page}
        </a>
    );
}

export default function Pagination({ currentPage, lastPage, urlPattern }: PaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    const getPageUrl = (page: number) => {
        if (page === 1) {
            // First page has no page number in URL
            // Special case: homepage is at / not /page
            if (urlPattern.startsWith('/page/')) {
                return '/';
            }
            return urlPattern.replace(/\/\d+$/, '').replace(/\/$/, '') || '/';
        }
        return urlPattern.replace(/\d+$/, String(page));
    };

    const pages: (number | 'ellipsis')[] = [];

    // Always show first page
    pages.push(1);

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(lastPage - 1, currentPage + 1);

    // Add ellipsis if there's a gap
    if (startPage > 2) {
        pages.push('ellipsis');
    }

    // Add pages around current
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // Add ellipsis if there's a gap
    if (endPage < lastPage - 1) {
        pages.push('ellipsis');
    }

    // Always show last page (if not page 1)
    if (lastPage > 1) {
        pages.push(lastPage);
    }

    return (
        <nav className="flex items-center justify-center gap-2 pt-8" aria-label="Pagination">
            <NavButton
                href={currentPage > 1 ? getPageUrl(currentPage - 1) : undefined}
                disabled={currentPage <= 1}
                ariaLabel="Previous page"
            >
                <span>←</span>
                <span className="hidden sm:inline">{ui.pagination.previous}</span>
            </NavButton>

            <div className="flex items-center gap-1">
                {pages.map((page, index) =>
                    page === 'ellipsis' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="bg-background2 px-2 text-neutral-500"
                        >
                            ...
                        </span>
                    ) : (
                        <PageButton
                            key={page}
                            page={page}
                            href={getPageUrl(page)}
                            isCurrent={page === currentPage}
                        />
                    ),
                )}
            </div>

            <NavButton
                href={currentPage < lastPage ? getPageUrl(currentPage + 1) : undefined}
                disabled={currentPage >= lastPage}
                ariaLabel="Next page"
                next
            >
                <span className="hidden sm:inline">{ui.pagination.next}</span>
                <span>→</span>
            </NavButton>
        </nav>
    );
}
