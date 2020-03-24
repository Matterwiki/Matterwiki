import React from 'react'
import shallow from 'zustand/shallow'
import { useAsync } from 'react-async-hook'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { FullScreenSpinner, List, CardListItem, Heading4 } from '@/common/ui'
import { pickFromState } from '@/common/utils/'
import useTopicStore from './topic-store'

export default function TopicsList() {
    const [topicList, getTopicList] = useTopicStore(
        pickFromState('topicList', 'getList'),
        shallow,
    )
    const history = useHistory()
    const { url } = useRouteMatch()
    const { error, loading } = useAsync(getTopicList, [])

    if (loading) return <FullScreenSpinner />
    if (error) {
        return <Heading4>😢 There was an error fetching topics.</Heading4>
    }
    if (topicList.length === 0) {
        return <Heading4>😵 Looks like no topics were found!</Heading4>
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
