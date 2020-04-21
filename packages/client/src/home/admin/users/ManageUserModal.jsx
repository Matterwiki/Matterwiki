import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useAsync } from 'react-async-hook'
import { Box } from '@chakra-ui/core'

import { userApi } from '@/common/utils/'
import { Spinner, SimpleModal, ErrorAlert } from '@/common/ui'
import { UserForm } from '@/common/components'

import useUserStore from './user-store'

/**
 * Manages creating and editing users
 *
 * TODO: If the behaviour for add and edit change too much, it may be time to split this component up!
 * @param {*} props
 */
export default function ManageUserModal({ createMode, onClose: handleClose }) {
    const { id } = useParams()
    const [saveUser, createUser] = useUserStore('save', 'create')
    const { loading, error, result } = useAsync(async () => {
        if (createMode) return
        return userApi.getOne(id)
    }, [])

    const handleSubmit = async user => {
        if (createMode) await createUser(user)
        else await saveUser(id, user)

        handleClose()
    }

    const title = createMode ? 'Add User' : 'Edit User'
    const submitBtnText = createMode ? 'Create User' : 'Save User'

    return (
        <SimpleModal showModal={true} onClose={handleClose} title={title}>
            <Box padding={5}>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <ErrorAlert defaultErrorMessage="😢 There was an error fetching the user." />
                ) : (
                    <UserForm
                        initialValue={result}
                        onSubmit={handleSubmit}
                        submitBtnText={submitBtnText}
                    />
                )}
            </Box>
        </SimpleModal>
    )
}

ManageUserModal.propTypes = {
    createMode: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
}
