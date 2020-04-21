import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/core'

import { Heading1, Heading2, Heading3, List, ListItem, Link } from '../../ui'
import { NODE_TYPES } from './constants'

const blockStyles = {
    marginBottom: 3,
}

export default function Element({ attributes, children, element }) {
    switch (element.type) {
        case NODE_TYPES.BLOCK_QUOTE:
            return (
                <Box
                    {...attributes}
                    {...blockStyles}
                    borderLeft="2px"
                    borderColor="gray.100"
                    padding={3}
                    color="gray.500"
                    fontStyle="italic"
                    as="blockquote">
                    {children}
                </Box>
            )
        case NODE_TYPES.HEADING_ONE:
            return (
                <Heading1
                    {...attributes}
                    {...blockStyles}
                    fontWeight="600"
                    size="lg">
                    {children}
                </Heading1>
            )
        case NODE_TYPES.HEADING_TWO:
            return (
                <Heading2
                    {...attributes}
                    {...blockStyles}
                    fontWeight="700"
                    size="md">
                    {children}
                </Heading2>
            )
        case NODE_TYPES.HEADING_THREE:
            return (
                <Heading3
                    {...attributes}
                    {...blockStyles}
                    fontWeight="600"
                    size="sm"
                    textTransform="uppercase">
                    {children}
                </Heading3>
            )
        case NODE_TYPES.CODE_BLOCK:
            return (
                <Box
                    {...attributes}
                    {...blockStyles}
                    as="pre"
                    fontSize="xs"
                    padding={3}
                    borderRadius="4px"
                    backgroundColor="gray.100">
                    {children}
                </Box>
            )
        case NODE_TYPES.BULLETED_LIST:
            return (
                <List {...attributes} {...blockStyles} styleType="disc">
                    {children}
                </List>
            )
        case NODE_TYPES.NUMBERED_LIST:
            return (
                <List
                    {...attributes}
                    {...blockStyles}
                    as="ol"
                    styleType="decimal">
                    {children}
                </List>
            )
        case NODE_TYPES.LIST_ITEM:
            // 📝 Intentionally not mixing `blockStyles` in here, because it does not need it!
            return <ListItem {...attributes}>{children}</ListItem>

        case NODE_TYPES.LINK:
            return (
                <Link {...attributes} {...blockStyles} href={element.url}>
                    {children}
                </Link>
            )

        default:
            return (
                <Box as="p" {...attributes} {...blockStyles}>
                    {children}
                </Box>
            )
    }
}

// 📝 Don't care about these prop types, because Slate is going to be
//    providing them via `renderElement`
Element.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}
