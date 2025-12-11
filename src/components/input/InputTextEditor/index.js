/**
 * Copyright (c) Meta Platforms.
 * MIT License
 */

import React from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import {
    $isTextNode,
    DOMConversionMap,
    DOMExportOutput,
    isHTMLElement,
    ParagraphNode,
    TextNode,
} from 'lexical';

import TreeViewPlugin from './TreeViewPlugin';
import { parseAllowedColor, parseAllowedFontSize } from './styleConfig';
import ToolbarPlugin from './ToolbarPlugin';
import 'assets/scss/otherstyles.scss';

const placeholder = 'Enter some rich text...';

const ExampleTheme = {
    code: 'editor-code',

    heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
    },

    image: 'editor-image',
    link: 'editor-link',

    list: {
        listitem: 'editor-listitem',
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
    },

    paragraph: 'editor-paragraph',

    placeholder: 'editor-placeholder',

    quote: 'editor-quote',

    text: {
        bold: 'editor-text-bold',
        code: 'editor-text-code',
        hashtag: 'editor-text-hashtag',
        italic: 'editor-text-italic',
        overflowed: 'editor-text-overflowed',
        strikethrough: 'editor-text-strikethrough',
        underline: 'editor-text-underline',
        underlineStrikethrough: 'editor-text-underlineStrikethrough',
    },
};

const removeStylesExportDOM = (editor, target) => {
    const output = target.exportDOM(editor);
    if (output && isHTMLElement(output.element)) {
        for (const el of [
            output.element,
            ...output.element.querySelectorAll('[style],[class]'),
        ]) {
            el.removeAttribute('class');
            el.removeAttribute('style');
        }
    }
    return output;
};

const exportMap = new Map([
    [ParagraphNode, removeStylesExportDOM],
    [TextNode, removeStylesExportDOM],
]);

// ------------------------------
// Import styles from pasted DOM
// ------------------------------
const getExtraStyles = (element) => {
    let extraStyles = '';

    const fontSize = parseAllowedFontSize(element.style.fontSize);
    const backgroundColor = parseAllowedColor(element.style.backgroundColor);
    const color = parseAllowedColor(element.style.color);

    if (fontSize !== '' && fontSize !== '15px') {
        extraStyles += `font-size: ${fontSize};`;
    }
    if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
        extraStyles += `background-color: ${backgroundColor};`;
    }
    if (color !== '' && color !== 'rgb(0, 0, 0)') {
        extraStyles += `color: ${color};`;
    }

    return extraStyles;
};

const constructImportMap = () => {
    const importMap = {};

    const textImporters = TextNode.importDOM() || {};

    Object.keys(textImporters).forEach((tag) => {
        const fn = textImporters[tag];
        importMap[tag] = (importNode) => {
            const importer = fn(importNode);
            if (!importer) return null;

            return {
                ...importer,
                conversion: (element) => {
                    const output = importer.conversion(element);

                    if (
                        output === null ||
                        output.forChild === undefined ||
                        output.after !== undefined ||
                        output.node !== null
                    ) {
                        return output;
                    }

                    const extraStyles = getExtraStyles(element);
                    if (!extraStyles) return output;

                    const oldForChild = output.forChild;

                    return {
                        ...output,
                        forChild: (child, parent) => {
                            const textNode = oldForChild(child, parent);
                            if ($isTextNode(textNode)) {
                                textNode.setStyle(textNode.getStyle() + extraStyles);
                            }
                            return textNode;
                        },
                    };
                },
            };
        };
    });

    return importMap;
};

// ------------------------------
// Lexical Config
// ------------------------------
const editorConfig = {
    html: {
        export: exportMap,
        import: constructImportMap(),
    },
    namespace: 'React17RichTextDemo',
    nodes: [ParagraphNode, TextNode],
    onError(error) {
        throw error;
    },
    theme: ExampleTheme,
};

function Placeholder() {
    return <div className="editor-placeholder">{placeholder}</div>;
}


// ------------------------------
// Editor Component
// ------------------------------
export default function InputTextEditor() {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <ToolbarPlugin />

                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />


                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <TreeViewPlugin />
                </div>
            </div>
        </LexicalComposer>
    );
}