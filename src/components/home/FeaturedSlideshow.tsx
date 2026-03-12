import { useState, useEffect } from 'react';
import type { CollectionEntry } from 'astro:content';
import { getPostExcerpt } from '@/utils/excerpt';
import type { OptimizedImageData } from '@/utils/images';
import clsx from 'clsx';

interface FeaturedPost {
    post: CollectionEntry<'blog'>;
    optimizedImage?: OptimizedImageData;
}

interface Props {
    posts: FeaturedPost[];
}

interface SlideProps {
    post: CollectionEntry<'blog'>;
    optimizedImage?: OptimizedImageData;
    excerpt: string;
    className?: string;
    isFadingOut?: boolean;
}

function Slide({ post, optimizedImage, excerpt, className, isFadingOut }: SlideProps) {
    return (
        <a
            href={`/posts/${post.id}`}
            className={clsx('absolute inset-0', className, isFadingOut ? 'z-10' : 'group')}
            style={isFadingOut ? { pointerEvents: 'none' } : undefined}
        >
            {/* Mobile Layout: Image on top, content below */}
            <div className="flex h-full flex-col sm:hidden">
                {/* Image section - fixed height */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden">
                    {optimizedImage && (
                        <img
                            src={optimizedImage.src}
                            srcSet={optimizedImage.srcset}
                            sizes="100vw"
                            alt={optimizedImage.alt}
                            className={clsx(
                                'absolute inset-0 h-full w-full object-cover',
                                !isFadingOut &&
                                    'transform-gpu transition-transform duration-500 group-hover:scale-103',
                            )}
                            loading={isFadingOut ? 'lazy' : 'eager'}
                        />
                    )}
                </div>

                {/* Content section - fixed height */}
                <div className="bg-background2 flex h-52 shrink-0 flex-col px-4 py-6">
                    <div className="mb-2 inline-block w-fit rounded bg-(--primary) px-3 py-1 text-sm font-medium text-white">
                        {post.data.category}
                    </div>
                    <h2 className="font-header mb-2 line-clamp-2 text-2xl leading-6 font-bold text-gray-900 dark:text-white">
                        {post.data.title}
                    </h2>
                    <p className="mb-0! line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                        {excerpt}
                    </p>
                </div>
            </div>

            {/* Desktop Layout: Image with overlay */}
            <div className="hidden h-full sm:block">
                {optimizedImage && (
                    <img
                        src={optimizedImage.src}
                        srcSet={optimizedImage.srcset}
                        sizes={optimizedImage.sizes}
                        alt={optimizedImage.alt}
                        className={clsx(
                            'absolute inset-0 h-full w-full object-cover',
                            !isFadingOut &&
                                'transform-gpu transition-transform duration-500 group-hover:scale-103',
                        )}
                        loading={isFadingOut ? 'lazy' : 'eager'}
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-6 pb-10 md:p-10">
                    <div className="rounded-lg bg-black/30 p-4 backdrop-blur-md">
                        <div className="mx-2 mb-2 inline-block rounded bg-(--primary) px-3 py-1 text-sm font-medium text-white">
                            {post.data.category}
                        </div>
                        <h2 className="font-header mb-1 w-fit rounded-md px-2 text-3xl font-bold text-white md:text-[42px]">
                            {post.data.title}
                        </h2>
                        <p className="mb-0! line-clamp-2 w-fit rounded-md px-2 text-sm text-gray-200 md:line-clamp-3 md:text-base lg:text-lg">
                            {excerpt}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    );
}

interface NavigationButtonProps {
    direction: 'previous' | 'next';
    onClick: (e: React.MouseEvent) => void;
}

function NavigationButton({ direction, onClick }: NavigationButtonProps) {
    const isPrevious = direction === 'previous';
    return (
        <button
            onClick={onClick}
            className={clsx(
                'absolute z-10 flex cursor-pointer items-center justify-center rounded-full bg-white/80 text-gray-800 transition-transform hover:scale-110 hover:bg-white',
                // Mobile: smaller, on image
                'top-32 h-10 w-10',
                // Desktop: larger, centered
                'sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2',
                isPrevious ? 'left-4' : 'right-4',
            )}
            aria-label={`${isPrevious ? 'Previous' : 'Next'} slide`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <polyline points={isPrevious ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}></polyline>
            </svg>
        </button>
    );
}

export default function FeaturedSlideshow({ posts }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Auto-advance slides
    useEffect(() => {
        if (!isAutoPlaying || posts.length <= 1) return;

        const interval = setInterval(() => {
            setPreviousIndex(currentIndex);
            setIsTransitioning(true);
            setCurrentIndex((prev) => (prev + 1) % posts.length);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 800);
        }, 7000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, posts.length, currentIndex]);

    if (posts.length === 0) {
        return null;
    }

    const goToPrevious = () => {
        setPreviousIndex(currentIndex);
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 800);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setPreviousIndex(currentIndex);
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % posts.length);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 800);
        setIsAutoPlaying(false);
    };

    const current = posts[currentIndex];
    const previous = posts[previousIndex];
    const currentExcerpt = getPostExcerpt(current.post);
    const previousExcerpt = getPostExcerpt(previous.post);

    return (
        <div className="relative mb-8 overflow-hidden rounded-lg shadow-lg">
            <style>{`
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                .animate-fadeOut {
                    animation: fadeOut 0.8s ease-in-out forwards;
                }
            `}</style>

            {/* Featured Title */}
            <div className="absolute top-6 left-6 z-20 md:top-8 md:left-10">
                <h3 className="font-title rounded-md bg-black/35 px-3.5 pt-1 pb-2.5 text-xl font-semibold tracking-wide text-white backdrop-blur-md sm:text-3xl lg:text-5xl">
                    Highlights
                </h3>
            </div>

            <div className="relative h-100 md:h-125">
                {/* Previous Slide (fading out) */}
                {isTransitioning && previousIndex !== currentIndex && (
                    <Slide
                        post={previous.post}
                        optimizedImage={previous.optimizedImage}
                        excerpt={previousExcerpt}
                        className="animate-fadeOut"
                        isFadingOut={true}
                    />
                )}

                {/* Current Slide */}
                <Slide
                    post={current.post}
                    optimizedImage={current.optimizedImage}
                    excerpt={currentExcerpt}
                />
            </div>

            {/* Navigation Arrows */}
            {posts.length > 1 && (
                <>
                    <NavigationButton
                        direction="previous"
                        onClick={(e) => {
                            e.preventDefault();
                            goToPrevious();
                        }}
                    />
                    <NavigationButton
                        direction="next"
                        onClick={(e) => {
                            e.preventDefault();
                            goToNext();
                        }}
                    />
                </>
            )}

            {/* Indicators */}
            {posts.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
                    {posts.map((_, index) => (
                        <div
                            key={index}
                            className={clsx(
                                'h-2 rounded-full transition-all',
                                index === currentIndex
                                    ? 'w-8 bg-gray-800 sm:bg-white dark:bg-white'
                                    : 'bg-gray-400/50 sm:bg-white/50 dark:bg-white/50',
                                'w-2',
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
