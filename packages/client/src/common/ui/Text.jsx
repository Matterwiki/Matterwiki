import React from 'react'
import PropTypes from 'prop-types'
import {
    Flex,
    Text as ChakraText,
    Heading as ChakraHeading,
} from '@chakra-ui/core'

/**
 * Simple description wrapper
 * @param {*} props
 */
export function Description({ children, ...props }) {
    return (
        <ChakraText color="gray.500" fontSize="xs" isTruncated {...props}>
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
        <Flex justifyContent="flex-start" alignItems="center" {...props}>
            <Icon marginRight={2} />
            <ChakraText>{text}</ChakraText>
        </Flex>
    )
}

TextWithIcon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
}

const commonHeadingStyles = {
    fontWeight: 300,
}

/**
 * Heading1 component
 */
export const Heading1 = React.forwardRef(function Heading1(props, ref) {
    return (
        <ChakraHeading
            as="h1"
            size="2xl"
            {...commonHeadingStyles}
            {...props}
            ref={ref}
        />
    )
})

/**
 * Heading2 component
 */
export const Heading2 = React.forwardRef(function Heading2(props, ref) {
    return (
        <ChakraHeading
            as="h2"
            size="xl"
            {...commonHeadingStyles}
            {...props}
            ref={ref}
        />
    )
})

/**
 * Heading3 component
 */
export const Heading3 = React.forwardRef(function Heading3(props, ref) {
    return (
        <ChakraHeading
            as="h3"
            size="lg"
            {...commonHeadingStyles}
            {...props}
            ref={ref}
        />
    )
})

/**
 * Heading4 component
 */
export const Heading4 = React.forwardRef(function Heading4(props, ref) {
    return (
        <ChakraHeading
            as="h4"
            size="md"
            {...commonHeadingStyles}
            {...props}
            ref={ref}
        />
    )
})

/**
 * One stop shop for text needs!
 */
export const Text = ChakraText
