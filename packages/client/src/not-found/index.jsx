import React from 'react'
import { Box, Stack } from '@chakra-ui/core'

import { Heading1, Heading2, Heading3, RouterLink } from '@/common/ui'

export default function NotFound() {
    return (
        <Stack alignItems="center" justifyContent="center" paddingY={12}>
            <Box as={Heading1} textAlign="center">
                😵😢
            </Box>
            <Heading2>Sorry, this page does not exist.</Heading2>
            <Heading3>
                <RouterLink to="/">Would you like to go back home? </RouterLink>
            </Heading3>
        </Stack>
    )
}
