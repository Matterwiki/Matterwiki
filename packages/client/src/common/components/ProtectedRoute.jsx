import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import _isEmpty from 'lodash/isEmpty'
import { useAsync } from 'react-async-hook'
import { Route, Redirect } from 'react-router-dom'

import { FullScreenSpinner } from '../ui/'
import { pickFromState } from '../utils/'
import { useAuthStore } from '../store/'

function RedirectToLogin({ location }) {
    return (
        <Redirect
            to={{
                pathname: '/login',
                search: new URLSearchParams({
                    // stringify the location so all location info is preserved
                    from: JSON.stringify(location),
                }).toString(),
            }}
        />
    )
}

RedirectToLogin.propTypes = {
    location: PropTypes.object.isRequired,
}

const RedirectToHome = () => <Redirect to="/" />

/**
 * Wraps React Router's `Route` component with auth checks.
 *
 * TODO: Ability to deal with both `children` or `component` props
 * @param {*} props
 */
export default function ProtectedRoute({
    component: Component,
    adminOnly,
    ...routerProps
}) {
    const [currentUser, verifyAuth] = useAuthStore(
        pickFromState('currentUser', 'verifyAuth'),
        shallow,
    )
    const verifyUserIfNeeded = async () => {
        // 🏎 Perf measure: If user is already fetched, no need to run this!
        if (!_isEmpty(currentUser)) return

        // Run verification only if needed; will run every page refresh!
        return verifyAuth()
    }
    const { error, loading } = useAsync(verifyUserIfNeeded, [currentUser])

    return (
        <Route
            {...routerProps}
            render={({ location }) => {
                if (loading) return <FullScreenSpinner />
                if (error) return <RedirectToLogin location={location} />

                // Do not allow user to proceed if this is an admin route and they aren't
                // allowed in there.
                if (adminOnly && !currentUser.isAdmin) return <RedirectToHome />

                return <Component />
            }}
        />
    )
}

ProtectedRoute.defaultProps = {
    adminOnly: false,
}

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    adminOnly: PropTypes.bool,
}
