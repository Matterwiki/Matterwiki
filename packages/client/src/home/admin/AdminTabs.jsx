import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import { Icons, NavItem, Tab, TabList } from '@/common/ui'

const AdminTab = navItemProps => {
    const match = useRouteMatch(navItemProps.to)

    return (
        <Tab highlight={match !== null}>
            <NavItem {...navItemProps} />
        </Tab>
    )
}

export default function AdminTabs() {
    const { url } = useRouteMatch()

    return (
        <TabList>
            <AdminTab
                to={`${url}/users`}
                icon={Icons.FaUserFriends}
                name="Users"
                desc="Create, edit, and delete users"
            />
            <AdminTab
                to={`${url}/topics`}
                icon={Icons.FaFolder}
                name="Topics"
                desc="Create, edit, and delete topics"
            />
            <AdminTab
                to={`${url}/customize`}
                icon={Icons.FaCog}
                name="Customize"
                desc="Change the color scheme, and logo"
            />
        </TabList>
    )
}
