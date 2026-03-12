import { SidebarBox } from '@/components/shared/Box.tsx';

type Tag = {
    name: string;
    count: number;
};

type TagsProps = {
    tags: Tag[];
    maxTags?: number; // Maximum number of tags to display
    minFontSize?: number; // Minimum font size in px
    maxFontSize?: number; // Maximum font size in px
};

function Tags({ tags, maxTags = 25, minFontSize = 12, maxFontSize = 20 }: TagsProps) {
    // Get top N tags by count, then sort alphabetically
    const topTags = tags.slice(0, maxTags).sort((a, b) => a.name.localeCompare(b.name));

    // Find min and max counts for font size calculation
    const counts = topTags.map((tag) => tag.count);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);

    // Calculate font size for a tag based on its count
    const getFontSize = (count: number): number => {
        if (minCount === maxCount) {
            return (minFontSize + maxFontSize) / 2;
        }
        const ratio = (count - minCount) / (maxCount - minCount);
        return minFontSize + ratio * (maxFontSize - minFontSize);
    };

    return (
        <SidebarBox title="Tags" className="tag-cloud">
            <div className="flex flex-wrap gap-2">
                {topTags.map((tag) => {
                    const fontSize = getFontSize(tag.count);
                    return (
                        <a
                            key={tag.name}
                            href={`/tag/${tag.name.toLowerCase()}`}
                            className="hover:text-accent inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-0.5 transition-colors dark:bg-gray-800"
                            style={{ fontSize: `${fontSize}px` }}
                            title={`${tag.name} (${tag.count})`}
                        >
                            <span>#{tag.name}</span>
                        </a>
                    );
                })}
            </div>
        </SidebarBox>
    );
}

export default Tags;
