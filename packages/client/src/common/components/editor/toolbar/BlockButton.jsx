import React from 'react'
import PropTypes from 'prop-types'
import { useSlate } from 'slate-react'

import EditorIconButton from './EditorIconButton'
import { toggleBlock, isBlockActive } from '../utils'

export default function BlockButton({ format, icon, text }) {
    const editor = useSlate()
    const isActive = isBlockActive(editor, format)

    return (
        <EditorIconButton
            icon={icon}
            text={text}
            isActive={isActive}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        />
    )
}

BlockButton.propTypes = {
    format: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    text: PropTypes.string,
}
