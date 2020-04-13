import React from 'react'
import { Image } from '@chakra-ui/core'

import Logo from '@/assets/logo.png'

export default function LogoImage(props) {
    return (
        <Image
            src="/api/public/logo.png"
            fallbackSrc={Logo}
            alt="Wiki Logo"
            {...props}
        />
    )
}
