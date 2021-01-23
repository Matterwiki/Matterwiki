import React, { useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'
import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
    CodePlugin,
    ParagraphPlugin,
    pipe,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE,
    ELEMENT_PARAGRAPH,
    EditablePlugins,
    withMarks,
} from '@udecode/slate-plugins'

import EditorToolbar from './toolbar'

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
                    height: '60vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}>
                <EditablePlugins
                    plugins={plugins}
                    placeholder="Enter some text..."
                />
            </Box>
        </Slate>
    )
}

export default Editor
