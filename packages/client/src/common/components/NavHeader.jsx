import React from 'react'
import { Box } from '@chakra-ui/core'
import { useRouteMatch } from 'react-router-dom'

import {
    Icons,
    RouterLink,
    NavItem,
    NavHeader as GenericNavHeader,
} from '../ui/'
import { useAuthStore } from '../store/'

import LogoImage from './LogoImage'

function LeftPartNav() {
    return (
        <RouterLink to="/">
            <Box width={6}>
                <LogoImage />
            </Box>
        </RouterLink>
    )
}

function RightPartNav() {
    const { url } = useRouteMatch('/home')
    const currentUser = useAuthStore(s => s.currentUser)

    return (
        <>
            {currentUser.isAdmin ? (
                <NavItem
                    to={`${url}/admin`}
                    icon={Icons.FaTerminal}
                    name="Admin"
                />
            ) : null}
            <NavItem
                to={`${url}/article/new`}
                icon={Icons.FaRegPlusSquare}
                name="New Article"
            />
            <NavItem to="/logout" icon={Icons.FaSignOutAlt} name="Logout" />
        </>
    )
}

/**
 * Full blown nav menu, used within the app
 * @param {*} props
 */
export default function NavHeader() {
    return <GenericNavHeader left={LeftPartNav} right={RightPartNav} />
}
