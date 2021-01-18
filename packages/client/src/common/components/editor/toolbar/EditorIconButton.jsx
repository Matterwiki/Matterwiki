import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, Button } from '@/common/ui'

const getToolbarBtnStyles = isActive => ({
    variant: 'ghost',
    colorScheme: 'gray',
    color: isActive ? 'primary.500' : 'text',
})

/**
 * Base editor toolbar button
 * @param {*} props
 */
const EditorIconButton = React.forwardRef(function EditorIconButton(
    { icon: Icon, text, onMouseDown, isActive, ...rest },
    ref,
) {
    const props = { ...getToolbarBtnStyles(isActive), ...rest }
    if (onMouseDown) props.onMouseDown = onMouseDown

    if (text)
        return (
            <Button {...props} sx={{ fontSize: '1rem' }} ref={ref}>
                {text}
            </Button>
        )
    return <IconButton icon={<Icon />} {...props} ref={ref} />
})

EditorIconButton.propTypes = {
    icon: PropTypes.elementType,
    text: PropTypes.string,
    onMouseDown: PropTypes.func,
    isActive: PropTypes.bool.isRequired,
}

export default EditorIconButton
