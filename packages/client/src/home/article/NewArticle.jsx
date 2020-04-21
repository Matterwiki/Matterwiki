import React from 'react'
import { useAsync } from 'react-async-hook'
import { Box, Flex } from '@chakra-ui/core'

import { Spinner, Heading4 } from '@/common/ui'
import { useTopicStore } from '@/common/store/'

import ArticleForm from './ArticleForm'

export default function NewArticle() {
    const [topicList, getTopicList] = useTopicStore('topicList', 'getList')
    const { error, loading } = useAsync(getTopicList, [])

    const handleArticleSave = async article => {
        // TODO: Implement me
        console.log(article)
    }

    if (loading) return <Spinner />
    if (error) {
        return <Heading4>😢 There was an error fetching topics.</Heading4>
    }

    return (
        <Flex alignItems="center" justifyContent="center">
            <Box width="full" flexBasis={{ lg: '45rem' }}>
                <ArticleForm topics={topicList} onSubmit={handleArticleSave} />
            </Box>
        </Flex>
    )
}
