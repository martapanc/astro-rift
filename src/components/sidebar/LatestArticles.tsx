import { ListItem, SidebarBox } from '@/components/shared/Box.tsx';
import { ui } from '@/consts.ts';

type Article = {
    id: string;
    title: string;
};

type LatestArticlesProps = {
    articles: Article[];
};

function LatestArticles({ articles }: LatestArticlesProps) {
    return (
        <SidebarBox title={ui.sidebar.latestArticles}>
            <ul className="flex flex-col">
                {articles.map((article, index) => (
                    <ListItem key={article.id} last={index === articles.length - 1}>
                        <a href={`/posts/${article.id}`} className="hover:text-accent leading-5.5">
                            {article.title}
                        </a>
                    </ListItem>
                ))}
            </ul>
        </SidebarBox>
    );
}

export default LatestArticles;
