import { ListItem, SidebarBox } from '@/components/shared/Box.tsx';
import { capitalize } from '@/utils/string';
import clsx from 'clsx';

export type Category = {
    name: string;
    count: number;
};

type CategoriesProps = {
    categories: Category[];
    currentCategory?: string;
};

function Categories({ categories, currentCategory }: CategoriesProps) {
    return (
        <SidebarBox title="Categories">
            <ul className="flex flex-col">
                {categories.map((category, index) => {
                    const isCurrent =
                        currentCategory?.toLowerCase() === category.name.toLowerCase();

                    return (
                        <ListItem key={category.name} last={index === categories.length - 1}>
                            <a
                                href={`/category/${category.name.toLowerCase()}`}
                                className={clsx(
                                    'hover:text-accent flex justify-between leading-5.5',
                                    isCurrent && 'text-primary font-semibold',
                                )}
                            >
                                <span>{capitalize(category.name)}</span>
                                <span>({category.count})</span>
                            </a>
                        </ListItem>
                    );
                })}
            </ul>
        </SidebarBox>
    );
}

export default Categories;
