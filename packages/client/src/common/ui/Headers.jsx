import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@chakra-ui/core'

import Icons from './Icons'
import { IconButton } from './Buttons'

/**
 * Full blown nav menu, used within the app
 * @param {*} props
 */
export function NavHeader({ left: Left, right: Right }) {
    const [showMenuItems, setShowMenuItems] = useState(false)
    const handleToggle = () => setShowMenuItems(!showMenuItems)

    const menuDisplayType = showMenuItems ? 'flex' : 'none'

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={5}
            width="full"
            boxShadow="md">
            <Flex align="center" marginRight={5}>
                <Left />
            </Flex>

            <IconButton
                display={[null, 'block', 'none']}
                icon={Icons.FaBars}
                size="xs"
                aria-label="Show Menu"
                onClick={handleToggle}
                variantColor="gray"
                backgroundColor="white"
                color="gray.500"
            />
            <Box
                flexGrow={1}
                backgroundColor="white"
                display={[menuDisplayType, menuDisplayType, 'flex']}
                flexDirection={['column', 'column', 'row']}
                justifyContent={['flex-start', 'flex-start', 'flex-end']}
                width={['full', 'full', 'auto']}>
                <Right />
            </Box>
        </Flex>
    )
}

NavHeader.propTypes = {
    left: PropTypes.elementType.isRequired,
    right: PropTypes.elementType.isRequired,
}

/**
 * A simple app header, used for unauthenticated pages
 */
export function SimpleHeader({ children }) {
    return <Box paddingY={10}>{children}</Box>
}

SimpleHeader.propTypes = {
    children: PropTypes.node.isRequired,
}
