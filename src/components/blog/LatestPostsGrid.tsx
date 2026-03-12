import type { CollectionEntry } from 'astro:content';
import { Box } from '@/components/shared/Box.tsx';

interface Props {
    posts: CollectionEntry<'blog'>[];
}

export default function LatestPostsGrid({ posts }: Props) {
    if (posts.length === 0) {
        return null;
    }

    return (
        <Box className="mt-5 p-5 lg:mt-7">
            <h3 className="font-header text-text wp-block-heading mb-6 text-3xl font-semibold">
                Ultimi articoli
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {posts.map((post) => (
                    <a
                        key={post.id}
                        href={`/posts/${post.id}`}
                        className="group relative block h-48 overflow-hidden rounded-lg"
                    >
                        {post.data.heroImage && (
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                style={{
                                    backgroundImage: `url('${post.data.heroImage.src}')`,
                                }}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                        <div className="absolute right-0 bottom-0 left-0 p-4">
                            <h4 className="font-header line-clamp-2 text-2xl font-semibold text-white">
                                {post.data.title}
                            </h4>
                        </div>
                    </a>
                ))}
            </div>
        </Box>
    );
}
