import { ListItem, SidebarBox } from '@/components/shared/Box.tsx';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { capitalize } from '@/utils/string';
import clsx from 'clsx';

type Archive = {
    year: number;
    month: number;
    count: number;
};

type ArchivesProps = {
    archives: Archive[];
    currentYear?: number;
    currentMonth?: number;
};

function Archives({ archives, currentYear, currentMonth }: ArchivesProps) {
    return (
        <SidebarBox title="Archives">
            <ul className="flex flex-col">
                {archives.map(({ year, month, count }, index) => {
                    const date = new Date(year, month - 1, 1);
                    const monthName = format(date, 'MMMM', { locale: enGB });
                    const displayText = `${capitalize(monthName)} ${year}`;
                    const href = `/${year}/${String(month).padStart(2, '0')}`;

                    const isCurrent = year === currentYear && month === currentMonth;

                    return (
                        <ListItem key={`${year}-${month}`} last={index === archives.length - 1}>
                            <a
                                href={href}
                                className={clsx(
                                    'hover:text-accent flex justify-between leading-5.5',
                                    isCurrent && 'text-primary font-semibold',
                                )}
                            >
                                <span>{displayText}</span>
                                <span>({count})</span>
                            </a>
                        </ListItem>
                    );
                })}
            </ul>
        </SidebarBox>
    );
}

export default Archives;
