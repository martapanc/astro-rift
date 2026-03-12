import { ListItem, SidebarBox } from '@/components/shared/Box.tsx';

type Article = {
    id: string;
    title: string;
};

type LatestArticlesProps = {
    articles: Article[];
};

function LatestArticles({ articles }: LatestArticlesProps) {
    return (
        <SidebarBox title="Latest Articles">
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
