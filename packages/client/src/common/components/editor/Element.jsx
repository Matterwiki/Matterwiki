import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    AspectRatioBox,
    Image,
    UnorderedList,
    OrderedList,
} from '@chakra-ui/react'
import { useSelected, useFocused } from 'slate-react'

import { Heading, ListItem, Link } from '../../ui'
import { NODE_TYPES } from './constants'

const slateElementProps = {
    // 📝 Don't care about these prop types, because Slate is going to be
    //    providing them via `renderElement`
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}

const blockStyles = {
    marginBottom: 3,
}

function ImageElement({ attributes, children, element }) {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <Box {...attributes} sx={{ ...blockStyles }}>
            <div contentEditable={false}>
                <AspectRatioBox maxWidth="full">
                    <Image
                        src={element.url}
                        objectFit="cover"
                        sx={{
                            objectFit: 'cover',
                            boxShadow:
                                selected && focused
                                    ? '0 0 0 3px #B4D5FF'
                                    : 'none',
                        }}
                    />
                </AspectRatioBox>
            </div>
            {children}
        </Box>
    )
}

ImageElement.propTypes = slateElementProps

export default function Element(props) {
    const { attributes, children, element } = props
    switch (element.type) {
        case NODE_TYPES.BLOCK_QUOTE:
            return (
                <Box
                    {...attributes}
                    sx={{
                        ...blockStyles,
                        borderLeft: '2px',
                        borderColor: 'gray.100',
                        padding: 3,
                        color: 'gray.500',
                        fontStyle: 'italic',
                    }}
                    as="blockquote">
                    {children}
                </Box>
            )
        case NODE_TYPES.HEADING_ONE:
            return (
                <Heading
                    {...attributes}
                    sx={{
                        ...blockStyles,
                        fontWeight: '600',
                    }}
                    size="lg">
                    {children}
                </Heading>
            )
        case NODE_TYPES.HEADING_TWO:
            return (
                <Heading
                    {...attributes}
                    sx={{
                        ...blockStyles,
                        fontWeight: '700',
                    }}
                    size="md">
                    {children}
                </Heading>
            )
        case NODE_TYPES.HEADING_THREE:
            return (
                <Heading
                    {...attributes}
                    sx={{
                        ...blockStyles,
                        fontWeight: '600',
                    }}
                    size="sm"
                    textTransform="uppercase">
                    {children}
                </Heading>
            )
        case NODE_TYPES.CODE_BLOCK:
            return (
                <Box
                    {...attributes}
                    as="pre"
                    sx={{
                        ...blockStyles,
                        fontSize: 'xs',
                        padding: 3,
                        borderRadius: '4px',
                        backgroundColor: 'gray.100',
                        whiteSpace: 'pre-wrap',
                    }}>
                    {children}
                </Box>
            )
        case NODE_TYPES.BULLETED_LIST:
            return (
                <UnorderedList {...attributes} sx={{ ...blockStyles }}>
                    {children}
                </UnorderedList>
            )
        case NODE_TYPES.NUMBERED_LIST:
            return (
                <OrderedList {...attributes} sx={{ ...blockStyles }}>
                    {children}
                </OrderedList>
            )
        case NODE_TYPES.LIST_ITEM:
            // 📝 Intentionally not mixing `blockStyles` in here, because it does not need it!
            return <ListItem {...attributes}>{children}</ListItem>

        case NODE_TYPES.LINK:
            return (
                <Link
                    {...attributes}
                    sx={{ ...blockStyles }}
                    href={element.url}>
                    {children}
                </Link>
            )

        case NODE_TYPES.IMAGE:
            return <ImageElement {...props} />

        default:
            return (
                <Box as="p" {...attributes} sx={{ ...blockStyles }}>
                    {children}
                </Box>
            )
    }
}

Element.propTypes = slateElementProps
