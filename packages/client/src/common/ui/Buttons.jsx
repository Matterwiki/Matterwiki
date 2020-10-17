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
        defaultProps,
    },
}

export const Button = ChakraButton
export const IconButton = ChakraIconButton
export const ButtonGroup = ChakraButtonGroup
