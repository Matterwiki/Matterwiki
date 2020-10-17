import { useMemo } from 'react'
import { useRouteMatch } from 'react-router-dom'

/**
 * Computes active tab index for admin section based on current route
 */
export default function useAdminTabIndex() {
    const { url } = useRouteMatch()
    const isUserRoute = useRouteMatch(`${url}/users`)
    const isTopicRoute = useRouteMatch(`${url}/topics`)
    const isCustomizeRoute = useRouteMatch(`${url}/customize`)
    const activeTabIndex = useMemo(() => {
        if (isUserRoute) return 0
        if (isTopicRoute) return 1
        if (isCustomizeRoute) return 2

        return 0
    }, [isUserRoute, isTopicRoute, isCustomizeRoute])

    return activeTabIndex
}
