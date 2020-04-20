import React from 'react'
import { Spinner as ChakraSpinner, Flex } from '@chakra-ui/core'

/**
 * Simple spinner, no character.
 */
export function BareSpinner(props) {
    return (
        <ChakraSpinner
            color="primary.500"
            size="xl"
            label="Loading..."
            {...props}
        />
    )
}

/**
 * Centered spinner.
 */
export function Spinner(props) {
    return (
        <Flex height="100%" justifyContent="center" alignItems="center">
            <BareSpinner {...props} />
        </Flex>
    )
}
