import React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Box, useToast } from '@chakra-ui/core'

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
        <Flex flexWrap="wrap" justifyContent="center">
            <Box flexBasis={['20rem', '25rem']} marginBottom={6}>
                <IntroInfo />
            </Box>
            <Box flexBasis={['20rem', '25rem']} paddingX={[0, 0, 6]}>
                <UserForm
                    passwordRequired
                    onSubmit={handleSignup}
                    submitBtnText="Setup my account"
                />
            </Box>
        </Flex>
    )
}
