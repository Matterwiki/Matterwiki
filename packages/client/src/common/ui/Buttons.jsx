import React from 'react'
import PropTypes from 'prop-types'
import { Button as ChakraButton } from '@chakra-ui/core'

export const Button = React.forwardRef(({ ...props }, ref) => {
    return (
        <ChakraButton
            ref={ref}
            size="sm"
            textTransform="uppercase"
            variantColor="primary"
            {...props}
        />
    )
})
Button.displayName = 'Button'

export function IconButton({ icon: Icon, ...buttonProps }) {
    return (
        <ChakraButton size="sm" variantColor="primary" {...buttonProps}>
            <Icon />
        </ChakraButton>
    )
}

IconButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
}
