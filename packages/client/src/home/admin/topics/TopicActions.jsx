import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Flex } from '@chakra-ui/core'

import { Button, Icons } from '@/common/ui'

export default function TopicActions() {
    const history = useHistory()
    const { url } = useRouteMatch()

    return (
        <Flex justifyContent="flex-end">
            <Button
                leftIcon={Icons.FaPlus}
                aria-label={`Add new topic`}
                onClick={() => history.push(`${url}/new`)}
                float="right">
                Add new topic
            </Button>
        </Flex>
    )
}
