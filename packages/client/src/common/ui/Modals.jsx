import React, { useState } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import PropTypes from 'prop-types'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
} from '@chakra-ui/core'

import { Button } from './Buttons'
import ErrorAlert from './ErrorAlert'
import { FullScreenSpinner } from './Spinners'

export function SimpleModal({ showModal, onClose, title, children }) {
    const [isOpen, setIsOpen] = useState(showModal)

    const handleClose = () => {
        onClose()
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            closeOnOverlayClick={false}
            closeOnEsc={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                {children}
            </ModalContent>
        </Modal>
    )
}

SimpleModal.defaultProps = {
    showModal: false,
    onClose: () => {},
}

SimpleModal.propTypes = {
    showModal: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

/**
 * Shows a warning box and runs the passed in async confirmation action
 *
 * It is recommended to be used before any destructive activity.
 *
 * @param {*} props
 */
export function AlertModal({ showModal, header, text, onCancel, onConfirm }) {
    const [isOpen, setIsOpen] = useState(showModal)
    const { loading, error, execute } = useAsyncCallback(async () => {
        await onConfirm()
        setIsOpen(false)
    })

    const handleCancel = () => {
        onCancel()
        setIsOpen(false)
    }

    const cancelRef = React.useRef()

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            closeOnEsc={false}
            closeOnOverlayClick={false}>
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {header}
                </AlertDialogHeader>

                <AlertDialogBody>
                    {loading ? (
                        <FullScreenSpinner />
                    ) : error ? (
                        <ErrorAlert jsError={error} variant="subtle" />
                    ) : (
                        text
                    )}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button
                        ref={cancelRef}
                        onClick={handleCancel}
                        variantColor="gray">
                        No
                    </Button>
                    <Button variantColor="red" onClick={execute} ml={3}>
                        Yes
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

AlertModal.defaultProps = {
    showModal: false,
    onCancel: () => {},
}

AlertModal.propTypes = {
    showModal: PropTypes.bool,
    header: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func.isRequired,
}
