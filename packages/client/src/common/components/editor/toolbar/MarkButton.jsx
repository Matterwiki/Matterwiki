import React from 'react'
import PropTypes from 'prop-types'
import { useSlate } from 'slate-react'

import EditorIconButton from './EditorIconButton'
import { toggleMark, isMarkActive } from '../utils'

export default function MarkButton({ format, icon }) {
    const editor = useSlate()
    const isActive = isMarkActive(editor, format)

    return (
        <EditorIconButton
            icon={icon}
            isActive={isActive}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        />
    )
}

MarkButton.propTypes = {
    format: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
}
