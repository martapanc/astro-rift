import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';

export interface OptimizedImageData {
    src: string;
    srcset: string;
    sizes: string;
    width: number;
    height: number;
    alt: string;
}

export interface PostWithOptimizedImage {
    post: CollectionEntry<'blog'>;
    optimizedImage?: OptimizedImageData;
}

interface ImageSize {
    width: number;
    descriptor: string;
}

const DEFAULT_SIZES: ImageSize[] = [
    { width: 400, descriptor: '400w' },
    { width: 800, descriptor: '800w' },
    { width: 1200, descriptor: '1200w' },
    { width: 1600, descriptor: '1600w' },
];

const optimizedImageCache = new Map<string, Promise<Omit<OptimizedImageData, 'alt'>>>();

export async function getOptimizedImage(
    image: ImageMetadata,
    alt: string,
    options?: {
        sizes?: string;
        widths?: number[];
    },
): Promise<OptimizedImageData> {
    const widths = options?.widths ?? DEFAULT_SIZES.map((s) => s.width);
    const sizes = options?.sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
    const cacheKey = `${image.src}|${widths.join(',')}|${sizes}`;

    const cachedResult =
        optimizedImageCache.get(cacheKey) ??
        await (async () => {
            const transformedImages = await Promise.all(
                widths.map((width) =>
                    getImage({
                        src: image,
                        width,
                        format: 'webp',
                    }),
                ),
            );
            const largestImage = transformedImages[transformedImages.length - 1];

            return {
                src: largestImage.src,
                srcset: transformedImages
                    .map((transformedImage, index) => `${transformedImage.src} ${widths[index]}w`)
                    .join(', '),
                sizes,
                width: largestImage.attributes.width as number,
                height: largestImage.attributes.height as number,
            };
        })();

    // @ts-expect-error cache optimisation
    optimizedImageCache.set(cacheKey, cachedResult);
    const optimized = await cachedResult;

    return { ...optimized, alt };
}

export async function getOptimizedImageSet(
    image: ImageMetadata,
    alt: string,
    configs: {
        mobile: { width: number; height?: number };
        desktop: { width: number; height?: number };
    },
): Promise<{
    mobile: OptimizedImageData;
    desktop: OptimizedImageData;
}> {
    const mobileWidths = [configs.mobile.width, Math.round(configs.mobile.width * 1.5)];
    const desktopWidths = [
        configs.desktop.width,
        Math.round(configs.desktop.width * 1.5),
        configs.desktop.width * 2,
    ];

    const [mobile, desktop] = await Promise.all([
        getOptimizedImage(image, alt, {
            widths: mobileWidths,
            sizes: `${configs.mobile.width}px`,
        }),
        getOptimizedImage(image, alt, {
            widths: desktopWidths,
            sizes: `(max-width: 1024px) 100vw, ${configs.desktop.width}px`,
        }),
    ]);

    return { mobile, desktop };
}

export async function getPostsWithOptimizedImages(
    posts: CollectionEntry<'blog'>[],
    options?: {
        widths?: number[];
        sizes?: string;
    },
): Promise<PostWithOptimizedImage[]> {
    const defaultOptions = {
        widths: [300, 450, 600],
        sizes: '(max-width: 1024px) 100vw, 300px',
    };

    const opts = { ...defaultOptions, ...options };
    const postsWithOptimizedImages: PostWithOptimizedImage[] = [];

    for (const post of posts) {
        let optimizedImage: OptimizedImageData | undefined;
        if (post.data.heroImage) {
            optimizedImage = await getOptimizedImage(post.data.heroImage, post.data.title, opts);
        }

        postsWithOptimizedImages.push({ post, optimizedImage });
    }

    return postsWithOptimizedImages;
}

export async function getFeaturedPostsWithImages(
    posts: CollectionEntry<'blog'>[],
): Promise<PostWithOptimizedImage[]> {
    return getPostsWithOptimizedImages(posts, {
        widths: [400, 640, 800, 1200, 1600],
        sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px',
    });
}
