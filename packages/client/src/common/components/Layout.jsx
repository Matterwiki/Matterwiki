import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Center, Image, Link, Stack } from '@chakra-ui/core'

import LogoWithName from '@/assets/logo-with-name.png'

import NavHeader from './NavHeader'
import SimpleHeader from './SimpleHeader'

/**
 * Component that encapsulates basic app layout.
 * Not to be confused with `Global` component, which holds global stying and theming.
 *
 * Also has some conditional logic to show different headers based on routes.
 */
export default function Layout({ children }) {
    const { pathname } = useLocation()
    const showNavHeader = pathname.toLowerCase().includes('home')

    return (
        <Stack spacing={5}>
            <Center sx={{ height: '10vh' }}>
                {showNavHeader ? <NavHeader /> : <SimpleHeader />}
            </Center>
            <Center sx={{ padding: 5 }}>{children}</Center>
            <Center
                as="footer"
                sx={{
                    height: '5vh',
                    fontSize: 'sm',
                }}>
                Powered by &nbsp;
                <Link href="http://matterwiki.com" isExternal>
                    <Image
                        sx={{
                            display: 'inline',
                            width: 20,
                        }}
                        src={LogoWithName}
                        alt="Wiki Logo"
                    />
                </Link>
            </Center>
        </Stack>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}
