/* eslint-disable no-unused-vars */
import React from 'react'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'

import { ProtectedRoute } from '@/common/components'
import Admin from './admin/index'
import Article from './article/index'

export default function Home() {
    const { path, url } = useRouteMatch()

    return (
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
    )
}
