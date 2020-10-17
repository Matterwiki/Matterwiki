import React from 'react'
import _get from 'lodash/get'
import { Box } from '@chakra-ui/core'
import { useRouteMatch } from 'react-router-dom'

import { Icons, RouterLink, NavItem, GenericNavHeader } from '../ui/'
import { useAuthStore } from '../store/'

import LogoImage from './LogoImage'

function LeftPartNav() {
    return (
        <RouterLink to="/">
            <Box sx={{ width: 6 }}>
                <LogoImage />
            </Box>
        </RouterLink>
    )
}

function RightPartNav() {
    const { url } = useRouteMatch('/home')
    const [currentUser] = useAuthStore('currentUser')

    return (
        <>
            {_get(currentUser, 'isAdmin') ? (
                <NavItem
                    to={`${url}/admin`}
                    icon={Icons.FaTerminal}
                    name="Admin"
                />
            ) : null}
            <NavItem
                to={`${url}/articles/new`}
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
