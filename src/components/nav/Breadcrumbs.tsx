export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-y-1">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index}>
                            {isLast ? (
                                <span className="text-gray-900 dark:text-white" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <>
                                    <a href={item.href} className="hover:text-accent">
                                        {item.label}
                                    </a>
                                    {index < items.length - 1 && (
                                        <span className="mx-2" aria-hidden="true">
                                            /
                                        </span>
                                    )}
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
