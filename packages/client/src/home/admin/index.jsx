import React from 'react'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/core'

import { ProtectedRoute } from '@/common/components'
import AdminSideNav from './AdminSideNav'
import Users from './users/index'
import Topics from './topics/index'
import Customize from './customize/index'

export default function Admin() {
    const { path, url } = useRouteMatch()

    return (
        <Flex flexWrap="wrap" justifyContent="center" width="full">
            <Box flexBasis={['25rem', '25rem', '30rem', '15rem']}>
                <AdminSideNav />
            </Box>
            <Box
                marginTop={[12, 12, 12, 0]}
                flexBasis={['25rem', '25rem', '30rem']}>
                <Switch>
                    <ProtectedRoute
                        adminOnly
                        isExact
                        path={`${path}/users`}
                        component={Users}
                    />
                    <ProtectedRoute
                        adminOnly
                        isExact
                        path={`${path}/topics`}
                        component={Topics}
                    />
                    <ProtectedRoute
                        adminOnly
                        isExact
                        path={`${path}/customize`}
                        component={Customize}
                    />
                    {/* 👋 Default child route */}
                    <Redirect from={`${path}`} to={`${url}/users`} />
                </Switch>
            </Box>
        </Flex>
    )
}
