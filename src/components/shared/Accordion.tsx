import type { ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { kebabCase } from 'text-kebab-case';
import type { FaqItem } from '@/components/pages/FaqBlock.tsx';

export const Accordion = ({
    item,
    open,
    onToggle,
    className,
    children,
}: {
    item: FaqItem;
    open: boolean;
    onToggle: (title: string) => void;
    className?: string;
    children: ReactNode;
}) => {
    return (
        <div
            className={clsx(
                'border-border group mb-4 flex w-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-neutral-900',
                className,
            )}
        >
            <div
                className="flex w-full cursor-pointer select-none items-center justify-between gap-4 px-4 py-4 transition-colors duration-200 hover:bg-gray-50 sm:px-6 dark:hover:bg-neutral-800"
                onClick={() => onToggle(item.question)}
            >
                <h3
                    id={kebabCase(item.question)}
                    className="leading-6 font-semibold break-words text-gray-900 sm:text-lg dark:text-white"
                    dangerouslySetInnerHTML={{ __html: item.question }}
                />
                <Icon
                    icon={
                        open
                            ? 'material-symbols:keyboard-arrow-up-rounded'
                            : 'material-symbols:keyboard-arrow-down-rounded'
                    }
                    className="text-accent h-6 w-6 flex-shrink-0 transition-transform duration-300"
                />
            </div>

            <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="accordion-text border-t border-gray-100 px-4 py-5 text-[15px] sm:px-6 sm:text-base dark:border-neutral-800">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};
