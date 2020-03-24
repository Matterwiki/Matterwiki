import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import { Alert, AlertIcon } from '@chakra-ui/core'

/**
 * Simple error alert, for forms
 * @param {any} props
 */
export default function ErrorAlert({
    jsError,
    defaultErrorMessage,
    ...alertProps
}) {
    const errorMessage = _get(jsError, 'message') || defaultErrorMessage

    return (
        <Alert
            fontSize="md"
            status="error"
            variant="left-accent"
            {...alertProps}>
            <AlertIcon />
            {errorMessage}
        </Alert>
    )
}

ErrorAlert.defaultProps = {
    defaultErrorMessage: 'There was a server error.',
}

ErrorAlert.propTypes = {
    defaultErrorMessage: PropTypes.string,
    jsError: PropTypes.object,
}
