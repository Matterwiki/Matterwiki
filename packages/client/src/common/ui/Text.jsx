import React from 'react'
import PropTypes from 'prop-types'
import { Text as ChakraText, Box, Stack } from '@chakra-ui/react'

/**
 * Simple description wrapper
 * @param {*} props
 */
export function Description({ children, ...props }) {
    return (
        <ChakraText
            sx={{
                color: 'gray.500',
                fontSize: 'xs',
            }}
            isTruncated
            {...props}>
            {children}
        </ChakraText>
    )
}

Description.propTypes = {
    children: PropTypes.node.isRequired,
}

/**
 * Component that renders an icon and accompanying text
 * @param {*} props
 */
export function TextWithIcon({ icon: Icon, text, ...props }) {
    return (
        <Stack
            direction="horizontal"
            spacing={2}
            sx={{ alignItems: 'center' }}
            {...props}>
            <Box as={Icon} sx={{ marginRight: 2 }} />
            <ChakraText>{text}</ChakraText>
        </Stack>
    )
}

TextWithIcon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
}

/**
 * One stop shop for text needs!
 */
export const Text = ChakraText
