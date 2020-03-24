import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import { useParams } from 'react-router-dom'

import { AlertModal } from '@/common/ui'
import { pickFromState } from '@/common/utils/'
import useTopicStore from './topic-store'

export default function DeleteTopicModal({ onClose: handleClose }) {
    const { id } = useParams()
    const [findTopicById, removeTopic] = useTopicStore(
        pickFromState('find', 'remove'),
        shallow,
    )

    const [topicToDelete, setTopicToDelete] = useState(null)

    useEffect(() => {
        const userToDelete = findTopicById(id) || null
        setTopicToDelete(userToDelete)
    }, [findTopicById, id])

    const handleDeleteConfirm = async () => {
        await removeTopic(topicToDelete.id)
        handleClose()
    }

    return topicToDelete ? (
        <AlertModal
            showModal
            header={`Remove Topic`}
            text={`Are you sure you want to do remove ${topicToDelete.name} from the Wiki?`}
            onCancel={handleClose}
            onConfirm={handleDeleteConfirm}
        />
    ) : null
}

DeleteTopicModal.propTypes = {
    onClose: PropTypes.func.isRequired,
}
