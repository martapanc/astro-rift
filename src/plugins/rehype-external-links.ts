import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

/**
 * Rehype plugin to add target="_blank" and rel="noopener noreferrer" to external links
 */
export default function rehypeExternalLinks() {
    return (tree: Root) => {
        visit(tree, 'element', (node: Element) => {
            if (node.tagName === 'a' && node.properties && node.properties.href) {
                const href = String(node.properties.href);

                // Check if the link is external (starts with http:// or https://)
                const isExternal = /^https?:\/\//.test(href);

                if (isExternal) {
                    node.properties.target = '_blank';
                    node.properties.rel = 'noopener noreferrer';
                }
            }
        });
    };
}
