import { SITE_LOCALE } from '@/consts.ts';

interface FormattedDateProps {
    date: Date | string;
}

export function FormattedDate({ date }: FormattedDateProps) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const formatted = new Intl.DateTimeFormat(SITE_LOCALE, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(dateObj);
    return <time dateTime={dateObj.toISOString()}>{formatted}</time>;
}
