import React from 'react'
import PropTypes from 'prop-types'
import { useAsyncCallback } from 'react-async-hook'

import { useForm } from '@/common/hooks'
import { Form, FormInput, Button } from '@/common/ui'

export default function LoginForm({ onSubmit }) {
    const [values, handleChange, handleSubmit] = useForm({
        email: '',
        password: '',
    })

    const { error, execute, loading } = useAsyncCallback(handleSubmit(onSubmit))

    return (
        <Form
            error={error}
            initialData={values}
            onFieldChange={handleChange}
            onSubmit={execute}>
            <FormInput
                fieldName="email"
                isRequired
                labelText="Email"
                placeholder="ward@cunningham.com"
                type="email"
            />
            <FormInput
                fieldName="password"
                isRequired
                labelText="Password"
                placeholder="SecurePassword"
                type="password"
            />
            <Button isLoading={loading} loadingText="Submitting" type="submit">
                Login
            </Button>
        </Form>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
