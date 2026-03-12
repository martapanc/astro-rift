import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import type { Root, Element, Text, ElementContent } from 'hast';

/**
 * Rehype plugin to automatically parse and style quote authors in blockquotes.
 * Looks for the LAST triple dash (---) in blockquote text and creates:
 * <blockquote>
 *   <span class="iconify quote-icon" data-icon="..."></span>
 *   <div class="quote-content">
 *     <p>Quote text</p>
 *     <span class="author">— Author Name</span>
 *   </div>
 * </blockquote>
 *
 * Usage in markdown:
 * > Quote text here
 * --- Author Name, *Book Title* (2006)
 */
export default function rehypeQuoteAuthor() {
    return (tree: Root) => {
        visit(tree, 'element', (node: Element) => {
            if (node.tagName !== 'blockquote') return;

            // Find the last paragraph in the blockquote
            let lastParagraphIndex = -1;
            for (let i = node.children.length - 1; i >= 0; i--) {
                const child = node.children[i];
                if (child.type === 'element' && child.tagName === 'p') {
                    lastParagraphIndex = i;
                    break;
                }
            }

            if (lastParagraphIndex === -1) return;
            const lastParagraph = node.children[lastParagraphIndex] as Element;

            // Extract all text from the last paragraph to find the last triple dash
            const fullText = extractAllText(lastParagraph);

            // Find the LAST occurrence of triple dash (---) which indicates author attribution
            const lastDashIndex = fullText.lastIndexOf('---');

            // Create icon placeholder for Iconify
            const iconPlaceholder = h('span', {
                class: 'iconify quote-icon',
                'data-icon': 'mdi:format-quote-open',
                'data-width': '24',
                'data-height': '24',
            });

            const newChildren: ElementContent[] = [];

            // Add all children before the last paragraph
            for (let i = 0; i < lastParagraphIndex; i++) {
                newChildren.push(node.children[i]);
            }

            // Check if there's an author attribution (triple dash found)
            if (lastDashIndex !== -1) {
                const afterDash = fullText.substring(lastDashIndex + 3).trim(); // +3 to skip all three dashes

                if (afterDash) {
                    // Split the paragraph content at the dash position
                    const result = splitNodesAtPosition(lastParagraph.children, lastDashIndex);

                    if (result) {
                        const { beforeNodes, afterNodes } = result;

                        // Create content wrapper with quote and author
                        const contentChildren: ElementContent[] = [];
                        if (beforeNodes.length > 0) {
                            contentChildren.push(h('p', beforeNodes));
                        }
                        const authorContent: ElementContent[] = [
                            { type: 'text', value: '— ' },
                            ...afterNodes,
                        ];
                        contentChildren.push(h('span', { class: 'author' }, authorContent));

                        const contentWrapper = h(
                            'div',
                            { class: 'quote-content' },
                            contentChildren,
                        );

                        // Add icon and content to blockquote
                        newChildren.push(iconPlaceholder);
                        newChildren.push(contentWrapper);

                        // Replace blockquote children
                        node.children = newChildren;
                        return;
                    }
                }
            }

            // No author attribution - just wrap existing content with icon
            const contentWrapper = h('div', { class: 'quote-content' }, node.children.slice());

            // Replace blockquote children with icon + content
            node.children = [iconPlaceholder, contentWrapper];
        });
    };
}

/**
 * Extract all text content from a node and its children
 */
function extractAllText(node: ElementContent | Element | Text): string {
    if (node.type === 'text') {
        return node.value;
    }
    if ('children' in node && node.children) {
        return node.children.map(extractAllText).join('');
    }
    return '';
}

/**
 * Split an array of nodes at a specific character position
 */
function splitNodesAtPosition(
    children: ElementContent[],
    position: number,
): { beforeNodes: ElementContent[]; afterNodes: ElementContent[] } | null {
    const beforeNodes: ElementContent[] = [];
    const afterNodes: ElementContent[] = [];
    let charCount = 0;

    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childText = extractAllText(child);
        const childLength = childText.length;
        const childEnd = charCount + childLength;

        if (childEnd <= position) {
            // This entire child is before the split position
            beforeNodes.push(child);
            charCount = childEnd;
        } else if (charCount <= position && position <= childEnd) {
            // The split position is within this child
            if (child.type === 'text') {
                const localPosition = position - charCount;
                const beforeText = child.value.substring(0, localPosition).trim();
                const afterText = child.value.substring(localPosition + 3).trim(); // +3 to skip the triple dash (---)

                if (beforeText) {
                    beforeNodes.push({ type: 'text', value: beforeText });
                }
                if (afterText) {
                    afterNodes.push({ type: 'text', value: afterText });
                }

                // Add all remaining sibling nodes to afterNodes
                for (let j = i + 1; j < children.length; j++) {
                    afterNodes.push(children[j]);
                }
            } else if (child.type === 'element' && child.children) {
                // Recursively split element's children
                const splitResult = splitNodesAtPosition(child.children, position - charCount);
                if (splitResult) {
                    if (splitResult.beforeNodes.length > 0) {
                        beforeNodes.push({
                            ...child,
                            children: splitResult.beforeNodes,
                        });
                    }
                    if (splitResult.afterNodes.length > 0) {
                        afterNodes.push({
                            ...child,
                            children: splitResult.afterNodes,
                        });
                    }
                }

                // Add all remaining sibling nodes to afterNodes
                for (let j = i + 1; j < children.length; j++) {
                    afterNodes.push(children[j]);
                }
            }
            break;
        } else {
            // This child is entirely after the split
            afterNodes.push(child);
        }

        charCount = childEnd;
    }

    return { beforeNodes, afterNodes };
}
