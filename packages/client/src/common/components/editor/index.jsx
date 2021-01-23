import React, { useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'
import {
    BlockquotePlugin,
    CodeBlockPlugin,
    HeadingPlugin,
    ResetBlockTypePlugin,
    SoftBreakPlugin,
    ExitBreakPlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
    CodePlugin,
    ParagraphPlugin,
    pipe,
    EditablePlugins,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE,
    ELEMENT_CODE_BLOCK,
    ELEMENT_PARAGRAPH,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    withMarks,
    isBlockAboveEmpty,
    isSelectionAtBlockStart,
} from '@udecode/slate-plugins'

import EditorToolbar from './toolbar'
import { PLACEHOLDER_TEXT } from './constants'

const resetBlockTypesCommonRule = {
    types: [MARK_BOLD, ELEMENT_CODE_BLOCK],
    defaultType: ELEMENT_PARAGRAPH,
}

const optionsResetBlockTypes = {
    rules: [
        {
            ...resetBlockTypesCommonRule,
            hotkey: 'Enter',
            predicate: isBlockAboveEmpty,
        },
        {
            ...resetBlockTypesCommonRule,
            hotkey: 'Backspace',
            predicate: isSelectionAtBlockStart,
        },
    ],
}

const headingTypes = [
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
]

const initialValue = [
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: 'This text is bold, italic and underlined.',
                [MARK_BOLD]: true,
                [MARK_ITALIC]: true,
                [MARK_UNDERLINE]: true,
            },
        ],
    },
]

const withPlugins = [withReact, withHistory, withMarks()]

const plugins = [
    ParagraphPlugin(),
    BlockquotePlugin(),
    CodeBlockPlugin(),
    HeadingPlugin(),
    ResetBlockTypePlugin(optionsResetBlockTypes),
    SoftBreakPlugin({
        rules: [
            { hotkey: 'shift+enter' },
            {
                hotkey: 'enter',
                query: {
                    allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE],
                },
            },
        ],
    }),
    ExitBreakPlugin({
        rules: [
            {
                hotkey: 'mod+enter',
            },
            {
                hotkey: 'mod+shift+enter',
                before: true,
            },
            {
                hotkey: 'enter',
                query: {
                    start: true,
                    end: true,
                    allow: headingTypes,
                },
            },
        ],
    }),
    BoldPlugin(),
    ItalicPlugin(),
    UnderlinePlugin(),
    StrikethroughPlugin(),
    CodePlugin(),
]

const Editor = () => {
    const [value, setValue] = useState(initialValue)
    const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={newValue => setValue(newValue)}>
            <EditorToolbar />
            <Box
                sx={{
                    padding: 3,
                    height: '50vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}>
                <EditablePlugins
                    plugins={plugins}
                    placeholder={PLACEHOLDER_TEXT}
                />
            </Box>
        </Slate>
    )
}

export default Editor
