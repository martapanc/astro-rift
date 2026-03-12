import type { CollectionEntry } from 'astro:content';

interface Props {
    prev: CollectionEntry<'blog'> | null;
    next: CollectionEntry<'blog'> | null;
}

export default function PostNavigation({ prev, next }: Props) {
    if (!prev && !next) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between gap-4 border-t border-gray-300 pt-10 pb-2">
            <div className="flex-1">
                {prev && (
                    <a
                        href={`/posts/${prev.id}`}
                        className="group flex flex-col justify-between text-left transition-colors hover:text-[var(--primary)]"
                    >
                        <span className="mb-1.5 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Articolo precedente
                        </span>
                        <span className="text-base font-medium group-hover:underline lg:text-lg">
                            {prev.data.title}
                        </span>
                    </a>
                )}
            </div>

            <div className="flex-1 text-right">
                {next && (
                    <a
                        href={`/posts/${next.id}`}
                        className="group flex flex-col justify-between text-right transition-colors hover:text-[var(--primary)]"
                    >
                        <span className="mb-1.5 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Prossimo articolo
                        </span>
                        <span className="text-base font-medium group-hover:underline lg:text-lg">
                            {next.data.title}
                        </span>
                    </a>
                )}
            </div>
        </nav>
    );
}
