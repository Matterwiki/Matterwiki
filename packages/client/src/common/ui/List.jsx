import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Flex,
    List as ChakraList,
    ListItem as ChakraListItem,
    Stack,
    Badge,
} from '@chakra-ui/core'

import { Description, Text } from './Text'
import { Button } from './Buttons'
import Icons from './Icons'

export function CardListItem({
    name,
    about,
    badgeText,
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick,
}) {
    return (
        <Flex
            as={ChakraListItem}
            width="full"
            borderBottom="1px"
            borderColor="gray.100"
            alignItems="center">
            <Box flexGrow={1}>
                <Text as="div">
                    {name}
                    {badgeText ? (
                        <Badge
                            variant="subtle"
                            variantColor="gray"
                            marginLeft={2}>
                            {badgeText}
                        </Badge>
                    ) : null}
                </Text>

                <Description>{about}</Description>
            </Box>
            <Stack marginY={4}>
                <Button
                    leftIcon={Icons.FaEdit}
                    size="xs"
                    aria-label={`Edit ${name} information`}
                    onClick={handleEditClick}
                    variant="outline">
                    Edit
                </Button>
                <Button
                    leftIcon={Icons.FaTrashAlt}
                    size="xs"
                    aria-label={`Delete ${name}`}
                    onClick={handleDeleteClick}
                    variantColor="red"
                    variant="outline">
                    Delete
                </Button>
            </Stack>
        </Flex>
    )
}

CardListItem.defaultProps = {
    badgeText: '',
}

CardListItem.propTypes = {
    name: PropTypes.string.isRequired,
    about: PropTypes.string,
    badgeText: PropTypes.string,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}

export const List = ChakraList
