import React from 'react'
import { useAsync } from 'react-async-hook'
import { useHistory, useRouteMatch } from 'react-router-dom'

import {
    Spinner,
    List,
    CardListItem,
    ErrorAlert,
    Heading4,
    CenteredBox,
} from '@/common/ui'
import { useTopicStore } from '@/common/store/'

export default function TopicsList() {
    const [topicList, getTopicList] = useTopicStore('topicList', 'getList')
    const history = useHistory()
    const { url } = useRouteMatch()
    const { error, loading } = useAsync(getTopicList, [])

    if (loading) return <Spinner />
    if (error) {
        return (
            <ErrorAlert
                variant="subtle"
                jsError={new Error('There was an error fetching topics.')}
            />
        )
    }
    if (topicList.length === 0) {
        return (
            <CenteredBox>
                <Heading4>😵 No topics found.</Heading4>
            </CenteredBox>
        )
    }

    return (
        <List>
            {topicList.map(topic => {
                const { id, description, isDefault, name } = topic
                const handleEditClick = () => history.push(`${url}/${id}`)
                const handleDeleteClick = () => {
                    history.push(`${url}/${id}/delete`)
                }

                return (
                    <CardListItem
                        key={id}
                        name={name}
                        badgeText={isDefault ? 'default' : ''}
                        about={description}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                )
            })}
        </List>
    )
}
