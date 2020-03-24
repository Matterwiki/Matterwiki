import React from 'react'
import { Image } from '@chakra-ui/core'
import { useRouteMatch } from 'react-router-dom'

import {
    Icons,
    RouterLink,
    NavItem,
    NavHeader as GenericNavHeader,
} from '../ui/'
import { useAuthStore } from '../store/'

import Logo from '@/assets/logo.png'

function LeftPartNav() {
    return (
        <RouterLink to="/">
            <Image width={40} src={Logo} alt="Wiki Logo" />
        </RouterLink>
    )
}

function RightPartNav() {
    const { url } = useRouteMatch('/home')
    const isAdmin = useAuthStore(s => s.isAdmin)

    return (
        <>
            {isAdmin() ? (
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
