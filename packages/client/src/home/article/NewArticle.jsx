import React from 'react'
import { useAsync } from 'react-async-hook'
import { Box, Stack } from '@chakra-ui/core'

import { Spinner, Heading } from '@/common/ui'
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
        return (
            <Heading size="lg">😢 There was an error fetching topics.</Heading>
        )
    }

    return (
        <Stack alignItems="center" height="full">
            <Box width={{ base: 'full', lg: '45rem' }} flexGrow={1}>
                <ArticleForm topics={topicList} onSubmit={handleArticleSave} />
            </Box>
        </Stack>
    )
}
