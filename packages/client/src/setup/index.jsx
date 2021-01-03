import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, SimpleGrid, useToast } from '@chakra-ui/react'

import { UserForm } from '@/common/components'
import { userApi } from '@/common/utils/'

import IntroInfo from './IntroInfo'

export default function SetupRoute() {
    const toast = useToast()
    const history = useHistory()
    const handleSignup = async user => {
        await userApi.createAdmin(user)
        toast({
            title: 'Admin created 🙌',
            status: 'success',
        })
        history.replace('/login')
    }

    return (
        <SimpleGrid columns={[1, 2]} spacing={10}>
            <Box
                sx={{
                    maxWidth: ['sm', 'md'],
                    padding: 5,
                }}>
                <IntroInfo />
            </Box>
            <Box>
                <UserForm
                    passwordRequired
                    onSubmit={handleSignup}
                    submitBtnText="Setup my account"
                />
            </Box>
        </SimpleGrid>
    )
}
