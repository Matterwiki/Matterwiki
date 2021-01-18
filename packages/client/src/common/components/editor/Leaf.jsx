import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import { Text } from '../../ui/Text'
import { NODE_TYPES } from './constants'

function renderLeafNode(leaf, children) {
    if (leaf[NODE_TYPES.BOLD])
        children = (
            <Text as="strong" sx={{ fontSize: '95%' }}>
                {children}
            </Text>
        )
    if (leaf[NODE_TYPES.ITALIC]) children = <Text as="i">{children}</Text>
    if (leaf[NODE_TYPES.UNDERLINED]) children = <Text as="u">{children}</Text>
    if (leaf[NODE_TYPES.STRIKETHROUGH])
        children = <Text as="del">{children}</Text>
    if (leaf[NODE_TYPES.CODE]) {
        children = (
            <Box
                as="code"
                sx={{
                    fontSize: '80%',
                    paddingY: '2px',
                    paddingX: '4px',
                    borderRadius: '4px',
                    backgroundColor: 'gray.100',
                }}>
                {children}
            </Box>
        )
    }

    return children
}

export default function Leaf({ attributes, children, leaf }) {
    return <span {...attributes}>{renderLeafNode(leaf, children)}</span>
}

// 📝 Don't care about these prop types, because Slate is going to be
//    providing them via `renderLeaf`
Leaf.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    leaf: PropTypes.any,
}
