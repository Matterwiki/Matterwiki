import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import { AlertModal } from '@/common/ui'
import useUserStore from './user-store'

export default function DeleteUserModal({ onClose: handleClose }) {
    const { id } = useParams()
    const [findUserById, removeUser] = useUserStore('find', 'remove')
    const [userToDelete, setUserToDelete] = useState(null)

    useEffect(() => {
        const userToDelete = findUserById(id) || null
        setUserToDelete(userToDelete)
    }, [findUserById, id])

    const handleDeleteConfirm = async () => {
        await removeUser(userToDelete.id)
        handleClose()
    }

    return userToDelete ? (
        <AlertModal
            showModal
            header={`Remove User`}
            text={`Are you sure you want to do remove ${userToDelete.name} from the Wiki?`}
            onCancel={handleClose}
            onConfirm={handleDeleteConfirm}
        />
    ) : null
}

DeleteUserModal.propTypes = {
    onClose: PropTypes.func.isRequired,
}
