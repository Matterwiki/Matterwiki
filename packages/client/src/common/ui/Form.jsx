import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@chakra-ui/core'

import ErrorAlert from './ErrorAlert'

/**
 * Context that gets shared between all form elements within the `Form` component
 */
export const FormContext = createContext({})

/**
 * A "batteries included" form wrapper that holds some common props.
 * Children get those props via `FormContext`.
 *
 * ⚠️ Form elements will not work if they aren't wrapped with this `Form` component!
 *
 * @param {*} props
 */
export default function Form({
    children,
    error,
    initialData,
    onFieldChange,
    onSubmit: handleSubmit,
}) {
    const [contextValue, setContextValue] = useState(null)
    useEffect(() => {
        setContextValue({ onFieldChange, error, initialData })
    }, [onFieldChange, error, initialData])

    return (
        <Stack spacing={3}>
            {error ? (
                <ErrorAlert
                    jsError={error}
                    defaultErrorMessage="There are errors in this form."
                />
            ) : null}
            <form onSubmit={handleSubmit}>
                <FormContext.Provider value={contextValue}>
                    {// Only render if contextValue has been set
                    contextValue ? children : null}
                </FormContext.Provider>
            </form>
        </Stack>
    )
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.object,
    initialData: PropTypes.object,
    onFieldChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}
