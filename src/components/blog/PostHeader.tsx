import type { CollectionEntry } from 'astro:content';
import { Icon } from '@iconify/react';
import { getMonthArchiveUrl } from '@/utils/archives.ts';
import { FormattedDate } from '@/components/nav/FormattedDate.tsx';

type PostHeaderProps = {
    post: CollectionEntry<'blog'>;
    readingMinutes: number;
};

function PostHeader({ post, readingMinutes }: PostHeaderProps) {
    const { title, pubDate, tags, category } = post.data;
    const monthArchiveUrl = getMonthArchiveUrl(pubDate);

    return (
        <div className="flex flex-col p-5 text-sm text-gray-500 dark:text-gray-400">
            <a
                href={`/category/${category.toLowerCase()}`}
                className="text-secondary mb-4 w-fit text-sm font-medium hover:brightness-125"
            >
                {category}
            </a>

            <h1 className="font-header mb-5 text-3xl font-semibold text-black md:text-4xl dark:text-white">
                {title}
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-gray-600 dark:text-gray-200">
                <div className="flex items-center gap-1">
                    <a
                        href={monthArchiveUrl}
                        className="hover:text-accent flex items-center gap-1.5"
                    >
                        <Icon
                            icon="mdi:calendar-month"
                            width="20"
                            height="20"
                        />
                        <span>
                            <FormattedDate date={pubDate} />
                        </span>
                    </a>
                </div>

                <div className="flex items-center gap-1">
                    <Icon icon="mdi:clock-time-four" width="20" height="20" />

                    <span className="pt-0">Reading time: {readingMinutes} minutes</span>
                </div>

                {tags && tags?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                        <Icon icon="mdi:tags" width="20" height="20" />

                        {tags.map((tag, index) => (
                            <a
                                key={tag}
                                href={`/tag/${tag.toLowerCase()}`}
                                className="hover:text-accent transition-colors"
                            >
                                #{tag}
                                {index < tags.length - 1 && ','}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostHeader;
