import { visit } from 'unist-util-visit';
import type { Root, Element, Text, ElementContent, Parent } from 'hast';

interface BibEntry {
    key: string;
    id: string; // kebab-case version of key
    index: number;
    citations: number[];
    fullText?: string;
    contentNodes?: ElementContent[]; // Preserve formatted content
}

function toKebabCase(str: string): string {
    return str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
}

/**
 * Rehype plugin to handle bibliography citations in HTML
 * Converts [Author YYYY] to clickable links
 * Processes bibliography entries with numbering and back-references
 */
export default function rehypeBibliography() {
    return (tree: Root) => {
        const bibEntries = new Map<string, BibEntry>();
        let inBibliography = false;
        const citationCounts = new Map<string, number>();

        // First pass: collect bibliography entries
        visit(tree, 'element', (node: Element) => {
            // Detect Bibliography heading
            if (node.tagName === 'h2') {
                const text = getTextContent(node);
                if (text === 'Bibliography') {
                    inBibliography = true;
                    return;
                }
            }

            // Collect bibliography entries
            if (inBibliography && node.tagName === 'p') {
                const text = getTextContent(node);
                const match = text.match(/^\[([^\]]+\d{4})\]/);
                if (match) {
                    const key = match[1].trim();

                    // Extract content after the citation key, preserving formatting
                    const contentNodes: ElementContent[] = [];
                    let foundKey = false;

                    for (const child of node.children) {
                        if (child.type === 'text') {
                            const keyMatch = child.value.match(/^\[([^\]]+\d{4})\]\s*/);
                            if (keyMatch) {
                                foundKey = true;
                                // Add remaining text after the key
                                const remaining = child.value.slice(keyMatch[0].length);
                                if (remaining) {
                                    contentNodes.push({ type: 'text', value: remaining });
                                }
                            } else if (foundKey) {
                                contentNodes.push(child);
                            }
                        } else if (foundKey) {
                            contentNodes.push(child);
                        }
                    }

                    if (!bibEntries.has(key)) {
                        bibEntries.set(key, {
                            key,
                            id: toKebabCase(key),
                            index: bibEntries.size + 1,
                            citations: [],
                            contentNodes,
                        });
                    }
                }
            }
        });

        // Sort entries alphabetically
        const sortedEntries = Array.from(bibEntries.values()).sort((a, b) =>
            a.key.localeCompare(b.key),
        );
        sortedEntries.forEach((entry, idx) => {
            entry.index = idx + 1;
        });

        // Second pass: process text nodes for citations and bibliography
        inBibliography = false;

        visit(tree, 'element', (node: Element, index, parent) => {
            // Detect Bibliography heading again
            if (node.tagName === 'h2') {
                const text = getTextContent(node);
                if (text === 'Bibliography') {
                    inBibliography = true;
                    return;
                }
            }

            // Process bibliography entry paragraphs
            if (inBibliography && node.tagName === 'p' && parent && index !== undefined) {
                const text = getTextContent(node);
                const match = text.match(/^\[([^\]]+\d{4})\]\s*(.+)/);
                if (match) {
                    const key = match[1].trim();
                    const entry = sortedEntries.find((e) => e.key === key);

                    if (entry) {
                        // Create back-reference links
                        const backRefs: Element[] =
                            entry.citations.length > 0
                                ? entry.citations.map(
                                      (): Element => ({
                                          type: 'element',
                                          tagName: 'a',
                                          properties: { href: `#cite-${entry.id}` },
                                          children: [{ type: 'text', value: '↑' }],
                                      }),
                                  )
                                : [];

                        // Create the bibliography entry div
                        const newNode: Element = {
                            type: 'element',
                            tagName: 'div',
                            properties: {
                                id: `ref-${entry.id}`,
                                className: ['bibliography-entry'],
                            },
                            children: [
                                {
                                    type: 'element',
                                    tagName: 'p',
                                    properties: {},
                                    children: [
                                        {
                                            type: 'element',
                                            tagName: 'strong',
                                            properties: {},
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: `[${key}]`,
                                                },
                                            ],
                                        },
                                        { type: 'text', value: ' ' } as Text,
                                        ...(entry.contentNodes || []),
                                        ...(backRefs.length > 0
                                            ? ([
                                                  { type: 'text', value: ' ' } as Text,
                                                  ...backRefs.flatMap((ref, i) =>
                                                      i > 0
                                                          ? [
                                                                {
                                                                    type: 'text',
                                                                    value: ' ',
                                                                } as Text,
                                                                ref,
                                                            ]
                                                          : [ref],
                                                  ),
                                              ] as ElementContent[])
                                            : []),
                                    ],
                                },
                            ],
                        };

                        // Replace the paragraph
                        (parent as Parent).children[index] = newNode;
                    }
                }
            }

            // Process citations in regular text (not in bibliography)
            if (!inBibliography && node.tagName === 'p') {
                processTextNodesInElement(node, sortedEntries, citationCounts);
            }
        });
    };
}

function getTextContent(node: Element): string {
    let text = '';
    visit(node, 'text', (textNode: Text) => {
        text += textNode.value;
    });
    return text;
}

function processTextNodesInElement(
    element: Element,
    sortedEntries: BibEntry[],
    citationCounts: Map<string, number>,
) {
    const newChildren: ElementContent[] = [];

    for (const child of element.children) {
        if (child.type === 'text') {
            const text = child.value;
            const citationRegex = /\[([^\]]+\d{4})\]/g;
            let lastIndex = 0;
            let hasMatches = false;

            let match;
            while ((match = citationRegex.exec(text)) !== null) {
                const key = match[1].trim();
                const entry = sortedEntries.find((e) => e.key === key);

                if (entry) {
                    hasMatches = true;

                    // Add text before citation
                    if (match.index > lastIndex) {
                        newChildren.push({
                            type: 'text',
                            value: text.slice(lastIndex, match.index),
                        });
                    }

                    // Track citation number
                    const citNum = (citationCounts.get(key) || 0) + 1;
                    citationCounts.set(key, citNum);
                    entry.citations.push(citNum);

                    // Add anchor span
                    newChildren.push({
                        type: 'element',
                        tagName: 'span',
                        properties: { id: `cite-${entry.id}` },
                        children: [],
                    });

                    // Add citation link
                    newChildren.push({
                        type: 'element',
                        tagName: 'a',
                        properties: { href: `#ref-${entry.id}` },
                        children: [{ type: 'text', value: `[${key}]` }],
                    });

                    lastIndex = match.index + match[0].length;
                }
            }

            // Add remaining text or original if no matches
            if (hasMatches && lastIndex < text.length) {
                newChildren.push({
                    type: 'text',
                    value: text.slice(lastIndex),
                });
            } else if (!hasMatches) {
                newChildren.push(child);
            }
        } else if (child.type === 'element') {
            // Recursively process inline elements (em, strong, etc.)
            processTextNodesInElement(child, sortedEntries, citationCounts);
            newChildren.push(child);
        } else {
            newChildren.push(child);
        }
    }

    if (newChildren.length > 0) {
        element.children = newChildren;
    }
}
