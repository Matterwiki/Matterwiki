import React from 'react'
import { Image } from '@chakra-ui/core'

import Logo from '@/assets/logo.png'

export default function LogoImage(props) {
    // TODO: Currently, while the custom logo is loaded, the `Image` component
    //       renders the fallback src, which is less than ideal.
    //       How about showing a `Spinner` instead?

    return (
        <Image
            src="/static/logo.png"
            fallbackSrc={Logo}
            alt="Wiki Logo"
            {...props}
        />
    )
}
