import React from 'react'
import { Divider, Stack } from '@chakra-ui/react'
import { Switch, useHistory, useRouteMatch } from 'react-router-dom'

import { ProtectedRoute } from '@/common/components'

import TopicActions from './TopicActions'
import TopicsList from './TopicsList'
import ManageTopicModal from './ManageTopicModal'
import DeleteTopicModal from './DeleteTopicModal'

export default function Topics() {
    const { path, url } = useRouteMatch()
    const history = useHistory()

    const handleModalClose = () => history.push(url)

    return (
        <Stack>
            <TopicActions />
            <Divider />
            <TopicsList />
            <Switch>
                <ProtectedRoute
                    adminOnly
                    exact
                    path={`${path}/new`}
                    component={() => (
                        <ManageTopicModal onClose={handleModalClose} />
                    )}
                />
                <ProtectedRoute
                    adminOnly
                    exact
                    path={`${path}/:id/delete`}
                    component={() => (
                        <DeleteTopicModal onClose={handleModalClose} />
                    )}
                />
                <ProtectedRoute
                    adminOnly
                    exact
                    path={`${path}/:id`}
                    component={() => (
                        <ManageTopicModal onClose={handleModalClose} />
                    )}
                />
            </Switch>
        </Stack>
    )
}
