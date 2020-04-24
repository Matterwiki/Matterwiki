import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/core'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

import EditorToolbar from './toolbar'
import Element from './Element'
import Leaf from './Leaf'
import { toggleMark } from './utils'
import { DEFAULT_EDITOR_VALUE, PLACEHOLDER_TEXT } from './constants'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

export default function Editor({
    initialValue,
    onChange: handleParentChange,
    // TODO: Maybe setup a plugin for this?
    imageUploadHandler,
}) {
    const [value, setValue] = useState(initialValue || DEFAULT_EDITOR_VALUE)
    const handleChange = useCallback(
        value => {
            setValue(value)
            handleParentChange(value)
        },
        [handleParentChange],
    )
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
        <Box border="1px" borderColor="border" borderRadius="2px" height="full">
            <Slate editor={editor} value={value} onChange={handleChange}>
                <EditorToolbar imageUploadHandler={imageUploadHandler} />
                <Box
                    padding={3}
                    maxHeight="62vh"
                    overflowY="auto"
                    overflowX="hidden">
                    <Editable
                        renderElement={Element}
                        renderLeaf={Leaf}
                        placeholder={PLACEHOLDER_TEXT}
                        spellCheck
                        autoFocus
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}
                    />
                </Box>
            </Slate>
        </Box>
    )
}

Editor.propTypes = {
    initialValue: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    imageUploadHandler: PropTypes.func.isRequired,
}
