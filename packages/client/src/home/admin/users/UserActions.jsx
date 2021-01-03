import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import { Button, Icons } from '@/common/ui'

export default function UserActions() {
    const history = useHistory()
    const { url } = useRouteMatch()

    return (
        <Flex justifyContent="flex-end">
            <Button
                leftIcon={Icons.FaPlus}
                aria-label={`Add new user`}
                onClick={() => history.push(`${url}/new`)}
                float="right">
                Add new user
            </Button>
        </Flex>
    )
}
