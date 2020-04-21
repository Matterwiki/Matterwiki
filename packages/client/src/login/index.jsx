import React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Box } from '@chakra-ui/core'

import LoginForm from './LoginForm'

import { safeJsonParse } from '@/common/utils/'
import { useAuthStore } from '@/common/store'
import { useLocationQuery } from '@/common/hooks/'

const defaultRoute = { pathname: '/home' }

export default function LoginRoute() {
    const [loginUser] = useAuthStore('login')
    const history = useHistory()
    const query = useLocationQuery()

    // Check if there is a query string `from`;
    // If there is one, use that!
    // This is set in `ProtectedRoute`, look at that to understand inner workings!
    const from = safeJsonParse(query.from)

    const handleLogin = async user => {
        await loginUser(user)
        history.replace(from || defaultRoute)
    }

    return (
        <Flex alignItems="center" justifyContent="center">
            <Box size={['xs', 'sm', 'md']} paddingX={[0, 0, 6]}>
                <LoginForm onSubmit={handleLogin} />
            </Box>
        </Flex>
    )
}
