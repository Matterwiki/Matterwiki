import { hot } from 'react-hot-loader'
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Global } from '@/common/ui'
import { ProtectedRoute, Layout } from '@/common/components'
import Setup from './setup/index'
import Login from './login/index'
import Logout from './logout/index'
import Home from './home/index'
import NotFound from './not-found/index'

/**
 * The main app component. Contains top level routes, styles, etc.
 * Most of the app's routes will be in the `Home` component!
 *
 * ⚠️ It would be prudent to keep this component light weight.
 */
function App() {
    return (
        <Global>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/setup" component={Setup} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <ProtectedRoute path="/home" component={Home} />
                        {/* 👋 Default base route */}
                        <Redirect exact from="/" to="/home" />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </Global>
    )
}

export default hot(module)(App)
