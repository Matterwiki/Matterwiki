import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Tabs, TabPanels, TabPanel } from '@chakra-ui/core'

import { ProtectedRoute } from '@/common/components'
import AdminTabs from './AdminTabs'
import Users from './users/index'
import Topics from './topics/index'
import Customize from './customize/index'

import useActiveTabIndex from './useActiveTabIndex'

export default function Admin() {
    const { path } = useRouteMatch()
    // Computes route to render, so `Switch` is not necessary
    const activeTabIndex = useActiveTabIndex()

    return (
        <Tabs isLazy index={activeTabIndex}>
            <AdminTabs />
            <TabPanels>
                <TabPanel>
                    <ProtectedRoute
                        adminOnly
                        isExact
                        path={`${path}/users`}
                        component={Users}
                    />
                </TabPanel>
                <TabPanel>
                    <ProtectedRoute
                        adminOnly
                        isExact
                        path={`${path}/topics`}
                        component={Topics}
                    />
                </TabPanel>
                <TabPanel>
                    <ProtectedRoute
                        adminOnly
                        isExact
                        path={`${path}/customize`}
                        component={Customize}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
