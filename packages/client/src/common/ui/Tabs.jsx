import React from 'react'
import PropTypes from 'prop-types'
import { TabList as ChakraTabList, Tab as ChakraTab } from '@chakra-ui/core'

export function Tab({ children, highlight }) {
    return (
        <ChakraTab
            sx={{
                backgroundColor: highlight ? 'gray.100' : null,
                _selected: {
                    boxShadow: 'none',
                },
            }}>
            {children}
        </ChakraTab>
    )
}

Tab.defaultProps = {
    highlight: false,
}

Tab.propTypes = {
    children: PropTypes.node.isRequired,
    highlight: PropTypes.bool,
}

export function TabList({ children }) {
    return (
        <ChakraTabList
            sx={{ maxWidth: ['sm', 'full'], overflow: ['auto', null] }}>
            {children}
        </ChakraTabList>
    )
}

TabList.propTypes = {
    children: PropTypes.node.isRequired,
}
