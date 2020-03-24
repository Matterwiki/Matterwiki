import React from 'react'
import { Divider } from '@chakra-ui/core'
import { Switch, useHistory, useRouteMatch } from 'react-router-dom'

import { ProtectedRoute } from '@/common/components'

import UserActions from './UserActions'
import UsersList from './UsersList'
import ManageUserModal from './ManageUserModal'
import DeleteUserModal from './DeleteUserModal'

export default function Users() {
    const { path, url } = useRouteMatch()
    const history = useHistory()

    const handleModalClose = () => history.push(url)

    return (
        <>
            <UserActions />
            <Divider />
            <UsersList />
            <Switch>
                <ProtectedRoute
                    adminOnly
                    exact
                    path={`${path}/new`}
                    component={() => (
                        <ManageUserModal
                            onClose={handleModalClose}
                            createMode
                        />
                    )}
                />
                <ProtectedRoute
                    adminOnly
                    exact
                    path={`${path}/:id/delete`}
                    component={() => (
                        <DeleteUserModal onClose={handleModalClose} />
                    )}
                />
                <ProtectedRoute
                    adminOnly
                    exact
                    path={`${path}/:id`}
                    component={() => (
                        <ManageUserModal onClose={handleModalClose} />
                    )}
                />
            </Switch>
        </>
    )
}
