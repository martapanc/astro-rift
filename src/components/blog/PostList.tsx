import { useState } from 'react';
import { PostPreview } from '@/components/blog/PostPreview.tsx';
import { Icon } from '@iconify/react';
import type { PostWithOptimizedImage } from '@/utils/images';
import clsx from 'clsx';

function PostList({
    posts,
    sortable = false,
}: {
    posts: PostWithOptimizedImage[];
    sortable?: boolean;
}) {
    const [ascending, setAscending] = useState(true);

    const sortedPosts = sortable
        ? [...posts].sort((a, b) => {
              const diff = a.post.data.pubDate.valueOf() - b.post.data.pubDate.valueOf();
              return ascending ? diff : -diff;
          })
        : posts;

    return (
        <>
            <div className="lg-w-[960px] pe-0 xl:pe-4">
                {sortable && (
                    <div className="mb-6 flex justify-end lg:mb-2">
                        <button
                            onClick={() => setAscending(!ascending)}
                            className={clsx(
                                'flex cursor-pointer items-center justify-start gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 sm:justify-center',
                                'w-full text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-fit',
                                'dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700',
                                'focus-visible:ring-primary/50 focus:outline-none focus-visible:ring-2',
                            )}
                        >
                            <Icon
                                icon={
                                    ascending
                                        ? 'mdi:arrow-up'
                                        : 'mdi:arrow-down'
                                }
                                className="h-4 w-4"
                            />
                            {ascending ? 'Oldest first' : 'Newest first'}
                        </button>
                    </div>
                )}
            </div>
            <div className="lg:w-240 lg:pe-8">
                <section>
                    <div className="flex flex-col gap-10">
                        {sortedPosts.map(({ post, optimizedImage }, index) => (
                            <PostPreview
                                post={post}
                                optimizedImage={optimizedImage}
                                key={post.id || index}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default PostList;
