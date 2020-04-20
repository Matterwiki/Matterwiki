import React, { useEffect } from 'react'
import { Stack } from '@chakra-ui/core'

import { Heading2, Heading3, Heading4, RouterLink } from '@/common/ui'
import { useAuthStore } from '@/common/store/'

export default function NotFound() {
    const [logoutUser] = useAuthStore('logout')
    useEffect(logoutUser)

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            spacing={4}
            padding={12}>
            <Heading2>🏃‍♂️</Heading2>
            <Heading3>You&apos;ve just been logged out.</Heading3>
            <Heading4>
                <RouterLink to="/login">
                    Would you like to log back in?
                </RouterLink>
            </Heading4>
        </Stack>
    )
}
