import React, { useEffect } from 'react'
import { Stack } from '@chakra-ui/core'

import { Heading, RouterLink } from '@/common/ui'
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
            <Heading size="2xl">🏃‍♂️</Heading>
            <Heading size="lg">You&apos;ve just been logged out.</Heading>
            <Heading size="md">
                <RouterLink to="/login">
                    Would you like to log back in?
                </RouterLink>
            </Heading>
        </Stack>
    )
}
