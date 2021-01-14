import React from 'react'
import { Spinner as ChakraSpinner, Flex } from '@chakra-ui/react'

/**
 * Centered spinner.
 */
export function Spinner(props) {
    return (
        <Flex
            sx={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <ChakraSpinner
                sx={{
                    color: 'primary.500',
                }}
                size="xl"
                label="Loading..."
                {...props}
            />
        </Flex>
    )
}
