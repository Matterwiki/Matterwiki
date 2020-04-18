import React from 'react'
import { useAsync } from 'react-async-hook'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { FullScreenSpinner, List, CardListItem, Heading4 } from '@/common/ui'
import useUserStore from './user-store'

export default function UsersList() {
    const [userList, getUserList] = useUserStore('userList', 'getList')
    const history = useHistory()
    const { url } = useRouteMatch()
    const { error, loading } = useAsync(getUserList, [])

    if (loading) return <FullScreenSpinner />
    if (error) return <Heading4>😢 There was an error fetching users.</Heading4>
    if (userList.length === 0) {
        return <Heading4>😵 Looks like no users were found!</Heading4>
    }

    return (
        <List>
            {userList.map(user => {
                const { id, about, name, isAdmin } = user
                const handleEditClick = () => history.push(`${url}/${id}`)
                const handleDeleteClick = () => {
                    history.push(`${url}/${id}/delete`)
                }

                return (
                    <CardListItem
                        key={id}
                        name={name}
                        badgeText={isAdmin ? 'admin' : ''}
                        about={about}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                )
            })}
        </List>
    )
}
