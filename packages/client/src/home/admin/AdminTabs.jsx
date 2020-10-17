import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { TabList, Tab } from '@chakra-ui/core'

import { Icons, NavItem } from '@/common/ui'

export default function AdminTabs() {
    const { url } = useRouteMatch()

    return (
        <TabList>
            <Tab>
                <NavItem
                    to={`${url}/users`}
                    icon={Icons.FaUserFriends}
                    name="Users"
                    desc="Create, edit, and delete users"
                />
            </Tab>
            <Tab>
                <NavItem
                    to={`${url}/topics`}
                    icon={Icons.FaFolder}
                    name="Topics"
                    desc="Create, edit, and delete topics"
                />
            </Tab>
            <Tab>
                <NavItem
                    to={`${url}/customize`}
                    icon={Icons.FaCog}
                    name="Customize"
                    desc="Change the color scheme, and logo"
                />
            </Tab>
        </TabList>
    )
}
