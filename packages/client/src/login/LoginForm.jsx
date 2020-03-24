import React from 'react'
import PropTypes from 'prop-types'
import { useAsyncCallback } from 'react-async-hook'
import _get from 'lodash/get'

import { useForm } from '@/common/hooks'
import { FormInput, Button, ErrorAlert } from '@/common/ui'

export default function LoginForm({ onSubmit }) {
    const [values, handleChange, handleSubmit] = useForm({
        email: '',
        password: '',
    })

    const { error, execute, loading } = useAsyncCallback(handleSubmit(onSubmit))

    const commonProps = {
        onChange: handleChange,
        validationError: _get(error, 'message'),
        values,
    }

    return (
        <>
            {error ? <ErrorAlert jsError={error} /> : null}
            <form onSubmit={execute}>
                <FormInput
                    fieldName="email"
                    isRequired={true}
                    labelText="Email"
                    placeholder="ward@cunningham.com"
                    type="email"
                    {...commonProps}
                />
                <FormInput
                    fieldName="password"
                    isRequired={true}
                    labelText="Password"
                    placeholder="SecurePassword"
                    type="password"
                    {...commonProps}
                />
                <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    marginY={4}
                    width="full"
                    type="submit">
                    Login
                </Button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
