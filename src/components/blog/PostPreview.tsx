import type { CollectionEntry } from 'astro:content';
import { getPostExcerpt } from '@/utils/excerpt.ts';
import { getMonthArchiveUrl } from '@/utils/archives.ts';
import { FormattedDate } from '@/components/nav/FormattedDate.tsx';
import { Icon } from '@iconify/react';
import type { OptimizedImageData } from '@/utils/images';

type PostPreviewProps = {
    post: CollectionEntry<'blog'>;
    optimizedImage?: OptimizedImageData;
};

export const PostPreview = ({ post, optimizedImage }: PostPreviewProps) => {
    const { id, data } = post;
    const excerpt = getPostExcerpt(post);
    const monthArchiveUrl = getMonthArchiveUrl(data.pubDate);

    return (
        <div className="flex flex-col gap-x-7 gap-y-5 text-base lg:flex-row">
            <a
                href={`/posts/${id}`}
                className="relative aspect-[9/8] h-[300px] shrink-0 overflow-hidden rounded-lg"
                aria-label={data.title}
            >
                {optimizedImage && (
                    <img
                        src={optimizedImage.src}
                        srcSet={optimizedImage.srcset}
                        sizes={optimizedImage.sizes}
                        alt={optimizedImage.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                )}
            </a>

            <div className="flex flex-col justify-center lg:px-4">
                <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
                    <a
                        href={`/category/${data.category.toLowerCase()}`}
                        className="text-accent w-fit text-sm font-medium hover:brightness-125"
                        aria-label={`Categoria - ${data.category}`}
                    >
                        {data.category}
                    </a>
                    <a href={`/posts/${id}`} className="hover:text-accent" aria-label={data.title}>
                        <h2 className="title font-header text-2xl font-semibold">{data.title}</h2>
                    </a>
                    <span className="mb-2 line-clamp-3 text-gray-600 dark:text-gray-400">
                        {excerpt}
                    </span>
                    <div className="date mb-4 flex flex-col items-center gap-x-6 gap-y-2 text-sm text-gray-600 sm:flex-row dark:text-gray-200">
                        <a
                            href={monthArchiveUrl}
                            className="hover:text-accent flex items-center gap-1.5"
                            aria-label="mese"
                        >
                            <Icon
                                icon="material-symbols:calendar-month-rounded"
                                width="20"
                                height="20"
                            />
                            <span className="pt-0.5">
                                <FormattedDate date={data.pubDate} />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
