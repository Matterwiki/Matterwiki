import React from 'react'
import { Spinner as ChakraSpinner, Flex } from '@chakra-ui/core'

/**
 * Simple spinner, no character.
 */
export function Spinner(props) {
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
 * Full screen centered spinner.
 */
export function FullScreenSpinner(props) {
    return (
        <Flex height="100%" justifyContent="center" alignItems="center">
            <Spinner {...props} />
        </Flex>
    )
}
