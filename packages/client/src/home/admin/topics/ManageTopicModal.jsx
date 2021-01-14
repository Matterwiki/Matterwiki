import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useAsync } from 'react-async-hook'
import { Box } from '@chakra-ui/react'

import { topicApi } from '@/common/utils/'
import { useTopicStore } from '@/common/store/'
import { Spinner, SimpleModal, ErrorAlert } from '@/common/ui'

import TopicForm from './TopicForm'

/**
 * Manages creating and editing topics
 *
 * TODO: If the behaviour for add and edit change too much, it may be time to split this component up!
 * @param {*} props
 */
export default function ManageTopicModal({ onClose: handleClose }) {
    const { id } = useParams()
    const [saveTopic, createTopic] = useTopicStore('save', 'create')
    const { loading, error, result } = useAsync(async () => {
        if (!id) return
        return topicApi.getOne(id)
    }, [])

    const handleSubmit = async topic => {
        if (!id) await createTopic(topic)
        else await saveTopic(id, topic)

        handleClose()
    }

    return (
        <SimpleModal
            showModal={true}
            onClose={handleClose}
            title={id ? 'Edit Topic' : 'Add Topic'}>
            <Box sx={{ padding: 5 }}>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <ErrorAlert defaultErrorMessage="😢 There was an error fetching the topic." />
                ) : (
                    <TopicForm initialValue={result} onSubmit={handleSubmit} />
                )}
            </Box>
        </SimpleModal>
    )
}

ManageTopicModal.propTypes = {
    onClose: PropTypes.func.isRequired,
}
