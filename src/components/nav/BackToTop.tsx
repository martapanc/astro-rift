import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility();

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={clsx(
                'fixed right-6 bottom-6 z-1000 flex h-10 w-10 cursor-pointer',
                'items-center justify-center rounded-full bg-(--primary) text-white shadow-md',
                'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-0',
                'md:right-8 md:bottom-8 md:h-12 md:w-12',
                isVisible ? 'visible opacity-100' : 'invisible opacity-0',
            )}
            aria-label="Back to top"
            title="Back to top"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </button>
    );
}
