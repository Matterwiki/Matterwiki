import React from 'react'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'
import { Box } from '@chakra-ui/core'

import { ProtectedRoute } from '@/common/components'
import Admin from './admin/index'
import Article from './article/index'

export default function Home() {
    const { path, url } = useRouteMatch()

    return (
        <Box>
            <Switch>
                <ProtectedRoute
                    adminOnly
                    path={`${path}/admin`}
                    component={Admin}
                />
                <ProtectedRoute path={`${path}/articles`} component={Article} />
                {/* 👋 Default child route */}
                <Redirect from={`${path}`} to={`${url}/articles`} />
            </Switch>
        </Box>
    )
}
