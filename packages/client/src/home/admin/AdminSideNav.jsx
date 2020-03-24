import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Stack } from '@chakra-ui/core'

import { Icons, NavItem } from '@/common/ui'

function AdminSideNavItem(props) {
    return (
        <NavItem
            {...props}
            highlightActive
            borderBottom="1px"
            borderColor="gray.100"
            borderRadius="4px"
        />
    )
}

export default function AdminSideNav() {
    const { url } = useRouteMatch()

    return (
        <Stack>
            <AdminSideNavItem
                to={`${url}/users`}
                icon={Icons.FaUserFriends}
                name="Users"
                desc="Create, edit, and delete users"
            />

            <AdminSideNavItem
                to={`${url}/topics`}
                icon={Icons.FaFolder}
                name="Topics"
                desc="Create, edit, and delete topics"
            />

            <AdminSideNavItem
                to={`${url}/customize`}
                icon={Icons.FaCog}
                name="Customize"
                desc="Change the color scheme, and logo"
            />
        </Stack>
    )
}
