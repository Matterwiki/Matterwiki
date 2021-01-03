import React from 'react'
import { Box } from '@chakra-ui/react'

import { LogoImage } from '../components'

/**
 * A simple app header, used for unauthenticated pages
 */
export default function SimpleHeader() {
    return (
        <Box
            sx={{
                width: 10,
                paddingTop: 8,
            }}>
            <LogoImage />
        </Box>
    )
}
