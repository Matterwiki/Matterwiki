import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import { useParams } from 'react-router-dom'
import { useAsync } from 'react-async-hook'
import { Box } from '@chakra-ui/core'

import { pickFromState } from '@/common/utils/'
import { FullScreenSpinner, SimpleModal, ErrorAlert } from '@/common/ui'

import TopicForm from './TopicForm'
import useTopicStore from './topic-store'
import topicApi from './topic-api'

/**
 * Manages creating and editing topics
 *
 * TODO: If the behaviour for add and edit change too much, it may be time to split this component up!
 * @param {*} props
 */
export default function ManageTopicModal({ createMode, onClose: handleClose }) {
    const { id } = useParams()
    const [saveTopic, createTopic] = useTopicStore(
        pickFromState('save', 'create'),
        shallow,
    )
    const { loading, error, result } = useAsync(async () => {
        if (createMode) return
        return topicApi.getOne(id)
    }, [])

    const handleSubmit = async topic => {
        if (createMode) await createTopic(topic)
        else await saveTopic(id, topic)

        handleClose()
    }

    const title = createMode ? 'Add Topic' : 'Edit Topic'

    return (
        <SimpleModal showModal={true} onClose={handleClose} title={title}>
            {loading ? (
                <FullScreenSpinner />
            ) : error ? (
                <Box padding={3}>
                    <ErrorAlert defaultErrorMessage="😢 There was an error fetching the topic." />
                </Box>
            ) : (
                <Box paddingX={6} paddingY={2}>
                    <TopicForm initialValue={result} onSubmit={handleSubmit} />
                </Box>
            )}
        </SimpleModal>
    )
}

ManageTopicModal.propTypes = {
    createMode: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
}
