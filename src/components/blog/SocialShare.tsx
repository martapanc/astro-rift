import { useState } from 'react';
import { Icon } from '@iconify/react';

interface SocialShareProps {
    url: string;
    title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const encodedTitle = encodeURIComponent(title);
    const encoredUrl = encodeURIComponent(url);

    const shareUrls = {
        email: `mailto:?subject=${encodedTitle}&body=${encoredUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoredUrl}`,
        x: `https://twitter.com/intent/tweet?url=${encoredUrl}&text=${encodedTitle}`,
        reddit: `https://reddit.com/submit?url=${encoredUrl}&title=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoredUrl}`,
        telegram: `https://t.me/share/url?url=${encoredUrl}&text=${encodedTitle}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="my-8 flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-[#201e27]">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Condividi articolo
            </h3>
            <div className="flex flex-wrap gap-2">
                {/* Copy Link */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 sm:w-24 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    title="Copia link"
                >
                    <Icon icon={copied ? 'mdi:check' : 'mdi:content-copy'} width="20" height="20" />
                    <span className="hidden sm:inline">{copied ? 'Copiato!' : 'Copia'}</span>
                </button>

                {/* Email */}
                <a
                    href={shareUrls.email}
                    className="flex items-center gap-2 rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white! transition-colors hover:bg-gray-700 hover:text-white!"
                    title="Condividi via email"
                >
                    <Icon icon="mdi:email" width="20" height="20" />
                    <span className="hidden sm:inline">Email</span>
                </a>

                {/* Facebook */}
                <a
                    href={shareUrls.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-[#1877F2] px-3 py-2 text-sm font-medium text-white! transition-colors hover:bg-[#166FE5] hover:text-white!"
                    title="Condividi su Facebook"
                >
                    <Icon icon="mdi:facebook" width="20" height="20" />
                    <span className="hidden sm:inline">Facebook</span>
                </a>

                {/* X */}
                <a
                    href={shareUrls.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-medium !text-white transition-colors hover:bg-gray-800 hover:!text-white"
                    title="Condividi su X"
                >
                    <Icon icon="ph:x-logo" width="20" height="20" />
                </a>

                {/* Reddit */}
                <a
                    href={shareUrls.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-[#FF4500] px-3 py-2 text-sm font-medium !text-white transition-colors hover:bg-[#E63E00] hover:!text-white"
                    title="Condividi su Reddit"
                >
                    <Icon icon="mdi:reddit" width="20" height="20" />
                    <span className="hidden sm:inline">Reddit</span>
                </a>

                {/* LinkedIn */}
                <a
                    href={shareUrls.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-[#0A66C2] px-3 py-2 text-sm font-medium !text-white transition-colors hover:bg-[#095196] hover:!text-white"
                    title="Condividi su LinkedIn"
                >
                    <Icon icon="mdi:linkedin" width="20" height="20" />
                    <span className="hidden sm:inline">LinkedIn</span>
                </a>

                {/* Telegram */}
                <a
                    href={shareUrls.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-[#26A5E4] px-3 py-2 text-sm font-medium !text-white transition-colors hover:bg-[#2095D3] hover:!text-white"
                    title="Condividi su Telegram"
                >
                    <Icon icon="mdi:telegram" width="20" height="20" />
                    <span className="hidden sm:inline">Telegram</span>
                </a>

                {/* WhatsApp */}
                <a
                    href={shareUrls.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-sm font-medium !text-white transition-colors hover:bg-[#20BD5A] hover:!text-white"
                    title="Condividi su WhatsApp"
                >
                    <Icon icon="mdi:whatsapp" width="20" height="20" />
                    <span className="hidden sm:inline">WhatsApp</span>
                </a>

                {/* Print */}
                <button
                    onClick={handlePrint}
                    className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    title="Stampa"
                >
                    <Icon icon="mdi:printer" width="20" height="20" />
                    <span className="hidden sm:inline">Stampa</span>
                </button>
            </div>
        </div>
    );
}
