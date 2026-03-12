import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface FormattedDateProps {
    date: Date | string;
}

export function FormattedDate({ date }: FormattedDateProps) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return (
        <time dateTime={dateObj.toISOString()}>
            {format(dateObj, 'd MMMM yyyy', { locale: it })}
        </time>
    );
}
