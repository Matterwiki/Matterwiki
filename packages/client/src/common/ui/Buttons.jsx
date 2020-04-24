import React from 'react'
import PropTypes from 'prop-types'
import {
    Button as ChakraButton,
    ButtonGroup as ChakraButtonGroup,
} from '@chakra-ui/core'

/**
 * Simple button component with some app specific theming and minor adjustments
 */
export const Button = React.forwardRef(function Button(props, ref) {
    return (
        <ChakraButton
            ref={ref}
            size="sm"
            textTransform="uppercase"
            variantColor="primary"
            _focus={{ boxShadow: 'none' }}
            {...props}
        />
    )
})

/**
 * Simple icon button component with some app specific theming and minor adjustments
 *
 * TODO: Using regular chakra button because chakra's `IconButton` rendered with some console warnings
 *
 * @param {*} props
 */
export const IconButton = React.forwardRef(function IconButton(
    { icon: Icon, ...buttonProps },
    ref,
) {
    return (
        <ChakraButton
            size="sm"
            variantColor="primary"
            _focus={{ boxShadow: 'none' }}
            {...buttonProps}
            ref={ref}>
            <Icon />
        </ChakraButton>
    )
})

IconButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
}

export const ButtonGroup = ChakraButtonGroup
