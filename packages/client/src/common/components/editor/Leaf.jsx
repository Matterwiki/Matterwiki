import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/core'

import { Text } from '../../ui/Text'

function renderLeafNode(leaf, children) {
    if (leaf.bold) children = <Text as="strong">{children}</Text>
    if (leaf.italic) children = <Text as="i">{children}</Text>
    if (leaf.underline) children = <Text as="u">{children}</Text>
    if (leaf.strikethrough) children = <Text as="del">{children}</Text>
    if (leaf.code) {
        children = (
            <Box
                as="code"
                fontSize="80%"
                paddingY="2px"
                paddingX="4px"
                borderRadius="4px"
                backgroundColor="gray.100">
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
