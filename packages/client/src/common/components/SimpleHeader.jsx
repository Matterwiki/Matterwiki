import React from 'react'
import { Box } from '@chakra-ui/core'

import { SimpleHeader as GenericSimpleHeader } from '../ui/'
import { LogoImage } from '../components'

/**
 * A simple app header, used for unauthenticated pages
 */
export default function SimpleHeader() {
    return (
        <GenericSimpleHeader>
            <Box width={20}>
                <LogoImage />
            </Box>
        </GenericSimpleHeader>
    )
}
