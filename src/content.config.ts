import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    // generateId extracts only the filename, ignoring subdirectories (for category organization)
    loader: glob({
        base: './src/content/blog',
        pattern: '**/*.{md,mdx}',
        generateId: ({ entry }) => {
            // Extract just the filename without extension, ignoring subdirectory path
            const filename = entry.split('/').pop() || entry;
            return filename.replace(/\.(md|mdx)$/, '');
        },
    }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            category: z.string(),
            tags: z
                .union([z.array(z.string()), z.string()])
                .optional()
                .nullable()
                .transform((val) => {
                    if (!val || val === '') return undefined;
                    if (typeof val === 'string') {
                        const tags = val
                            .split(',')
                            .map((tag) => tag.trim())
                            .filter((tag) => tag.length > 0);
                        return tags.length > 0 ? tags : undefined;
                    }
                    return val.length > 0 ? val : undefined;
                }),
            excerpt: z.string().optional(),
            // Transform string to Date object
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
            draft: z.boolean().default(false),
            featured: z.boolean().default(false),
            featuredRank: z.number().optional(),
        }),
});

const pages = defineCollection({
    loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        faqs: z
            .array(
                z.object({
                    question: z.string(),
                    answer: z.string(),
                }),
            )
            .optional(),
    }),
});

export const collections = { blog, pages };
