import React from 'react'
import { Image } from '@chakra-ui/core'

import Logo from '@/assets/logo.png'

import { SimpleHeader as GenericSimpleHeader } from '../ui/'

/**
 * A simple app header, used for unauthenticated pages
 */
export default function SimpleHeader() {
    return (
        <GenericSimpleHeader>
            <Image width={64} src={Logo} alt="Wiki Logo" />
        </GenericSimpleHeader>
    )
}
