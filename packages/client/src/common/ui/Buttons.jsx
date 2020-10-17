import {
    Button as ChakraButton,
    IconButton as ChakraIconButton,
    ButtonGroup as ChakraButtonGroup,
} from '@chakra-ui/core'

const defaultProps = {
    colorScheme: 'primary',
    size: 'sm',
}

export const theme = {
    Button: {
        baseStyle: {
            textTransform: 'uppercase',
            _focus: { boxShadow: 'none' },
        },
        defaultProps,
    },
    IconButton: {
        baseStyle: { _focus: { boxShadow: 'none' } },
        defaultProps,
    },
}

export const Button = ChakraButton

/**
 * Simple icon button component with some app specific theming and minor adjustments
 * TODO: Verify if we can simplify this
 * @param {*} props
 */
export const IconButton = ChakraIconButton

export const ButtonGroup = ChakraButtonGroup
