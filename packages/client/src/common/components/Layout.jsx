import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Stack, Box, Image, Link } from '@chakra-ui/core'

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
        <Stack align="center" height="100vh" spacing={8} overflow="hidden">
            {showNavHeader ? <NavHeader /> : <SimpleHeader />}
            <Box
                flexGrow={1}
                flexShrink={0}
                flexBasis="auto"
                width="full"
                marginX="auto"
                marginTop={8}
                paddingY={0}
                paddingX={8}
                minHeight={0}
                alignSelf="flex-start">
                {children}
            </Box>
            <Box as="footer" fontSize="sm" flexShrink={0} paddingY={4}>
                Powered by &nbsp;
                <Link href="http://matterwiki.com" isExternal>
                    <Image
                        display="inline"
                        width={20}
                        src={LogoWithName}
                        alt="Wiki Logo"
                    />
                </Link>
            </Box>
        </Stack>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}
