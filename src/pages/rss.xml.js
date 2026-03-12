import { getBlogPosts } from '../utils/posts';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION_PLAIN, SITE_TITLE } from '../consts';

export async function GET(context) {
    const posts = await getBlogPosts();
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION_PLAIN,
        site: context.site,
        items: posts.map((post) => ({
            ...post.data,
            link: `/posts/${post.id}/`,
        })),
    });
}
