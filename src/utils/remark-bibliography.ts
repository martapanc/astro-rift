import { visit } from 'unist-util-visit';
import type { Root, Text } from 'mdast';

interface BibEntry {
    key: string;
    index: number;
    citations: number[];
    fullText?: string;
}

/**
 * Remark plugin to automatically handle bibliography citations
 * Keeps [Author et al. Year] format in text as clickable links
 * Creates numbered bibliography entries with back-references
 */
export function remarkBibliography() {
    return (tree: Root) => {
        const bibEntries = new Map<string, BibEntry>();
        let inBibliography = false;

        // First pass: collect all bibliography entries and citations
        visit(tree, (node) => {
            // Detect bibliography section
            if (node.type === 'heading' && node.depth === 2) {
                const headingText = (node.children[0] as Text)?.value;
                if (headingText === 'Bibliography') {
                    inBibliography = true;
                    return;
                }
            }

            // Process bibliography entries
            if (inBibliography && node.type === 'paragraph') {
                const firstChild = node.children[0];
                if (firstChild && firstChild.type === 'text') {
                    const text = firstChild.value;
                    const match = text.match(/^\[([^\]]+\d{4})\]\s*(.+)/);
                    if (match) {
                        const key = match[1].trim();
                        const fullText = match[2].trim();
                        if (!bibEntries.has(key)) {
                            bibEntries.set(key, {
                                key,
                                index: bibEntries.size + 1,
                                citations: [],
                                fullText,
                            });
                        }
                    }
                }
            }

            // Find citations in text (not in bibliography)
            if (!inBibliography && node.type === 'text') {
                const text = (node as Text).value;
                const citationRegex = /\[([^\]]+\d{4})\]/g;
                let match;

                while ((match = citationRegex.exec(text)) !== null) {
                    const key = match[1].trim();
                    if (!bibEntries.has(key)) {
                        bibEntries.set(key, {
                            key,
                            index: bibEntries.size + 1,
                            citations: [],
                        });
                    }
                }
            }
        });

        // Sort bibliography entries alphabetically
        const sortedEntries = Array.from(bibEntries.values()).sort((a, b) =>
            a.key.localeCompare(b.key),
        );

        // Reassign indices after sorting
        sortedEntries.forEach((entry, idx) => {
            entry.index = idx + 1;
        });

        // Track citation occurrences
        const citationCounts = new Map<string, number>();

        // Second pass: replace content
        inBibliography = false;
        const nodesToModify: Array<{
            node: any;
            parent: any;
            index: number;
            newNodes: any[];
        }> = [];

        visit(tree, (node, index, parent) => {
            // Detect bibliography section again
            if (node.type === 'heading' && node.depth === 2) {
                const headingText = (node.children[0] as Text)?.value;
                if (headingText === 'Bibliography') {
                    inBibliography = true;
                    return;
                }
            }

            // Replace bibliography entries
            if (inBibliography && node.type === 'paragraph' && parent && index !== undefined) {
                const firstChild = node.children[0];
                if (firstChild && firstChild.type === 'text') {
                    const text = firstChild.value;
                    const match = text.match(/^\[([^\]]+\d{4})\]\s*(.+)/);
                    if (match) {
                        const key = match[1].trim();
                        const entry = sortedEntries.find((e) => e.key === key);

                        if (entry) {
                            const backRefs =
                                entry.citations.length > 0
                                    ? ' ' +
                                      entry.citations
                                          .map(
                                              (citNum) =>
                                                  `<a href="#cite-${entry.index}-${citNum}">↑</a>`,
                                          )
                                          .join(' ')
                                    : '';

                            nodesToModify.push({
                                node,
                                parent,
                                index,
                                newNodes: [
                                    {
                                        type: 'html',
                                        value: `<div id="ref-${entry.index}" class="bibliography-entry">
<p><strong>[${entry.index}] [${key}]</strong> ${entry.fullText || ''}${backRefs}</p>
</div>`,
                                    },
                                ],
                            });
                        }
                    }
                }
            }

            // Replace citations in text
            if (!inBibliography && node.type === 'text' && parent && index !== undefined) {
                const text = (node as Text).value;
                const citationRegex = /\[([^\]]+\d{4})\]/g;

                if (citationRegex.test(text)) {
                    citationRegex.lastIndex = 0;
                    const newNodes: any[] = [];
                    let lastIndex = 0;

                    let match;
                    while ((match = citationRegex.exec(text)) !== null) {
                        const trimmedKey = match[1].trim();
                        const entry = sortedEntries.find((e) => e.key === trimmedKey);

                        if (entry) {
                            // Add text before citation
                            if (match.index > lastIndex) {
                                newNodes.push({
                                    type: 'text',
                                    value: text.slice(lastIndex, match.index),
                                });
                            }

                            // Track citation number
                            const citNum = (citationCounts.get(trimmedKey) || 0) + 1;
                            citationCounts.set(trimmedKey, citNum);
                            entry.citations.push(citNum);

                            // Add anchor and link
                            newNodes.push({
                                type: 'html',
                                value: `<span id="cite-${entry.index}-${citNum}"></span>`,
                            });

                            newNodes.push({
                                type: 'link',
                                url: `#ref-${entry.index}`,
                                children: [{ type: 'text', value: `[${trimmedKey}]` }],
                            });

                            lastIndex = match.index + match[0].length;
                        }
                    }

                    // Add remaining text
                    if (lastIndex < text.length) {
                        newNodes.push({
                            type: 'text',
                            value: text.slice(lastIndex),
                        });
                    }

                    if (newNodes.length > 0) {
                        nodesToModify.push({
                            node,
                            parent,
                            index,
                            newNodes,
                        });
                    }
                }
            }
        });

        // Apply modifications in reverse order to maintain correct indices
        nodesToModify.reverse().forEach(({ parent, index, newNodes }) => {
            parent.children.splice(index, 1, ...newNodes);
        });
    };
}