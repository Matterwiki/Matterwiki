import React from 'react'
import PropTypes from 'prop-types'
import { useAsyncCallback } from 'react-async-hook'
import _get from 'lodash/get'
import _merge from 'lodash/merge'

import { useForm } from '../hooks'
import { FormInput, Button, ErrorAlert } from '../ui'

const getDefaultUserData = () => ({
    name: '',
    email: '',
    about: '',
    password: '',
})

/**
 * Basic user form used in a bunch of places
 * @param {*} props
 */
export default function UserForm({
    initialValue,
    passwordRequired,
    submitBtnText,
    onSubmit,
}) {
    const [values, handleChange, handleSubmit] = useForm(
        _merge(getDefaultUserData(), initialValue),
    )

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
                    fieldName="name"
                    isRequired={true}
                    labelText="Name"
                    placeholder="Ward Cunningham"
                    {...commonProps}
                />
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
                    helperText="Keep this secure. If lost, this cannot be recovered!"
                    isRequired={passwordRequired}
                    labelText="Password"
                    placeholder="MakeItSecureAsMuchAsPossible"
                    type="password"
                    {...commonProps}
                />
                <FormInput
                    fieldName="about"
                    labelText="About"
                    placeholder="I make wiki software 📖"
                    {...commonProps}
                />
                <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    marginY={4}
                    width="full"
                    type="submit">
                    {submitBtnText}
                </Button>
            </form>
        </>
    )
}

UserForm.defaultProps = {
    passwordRequired: false,
    submitBtnText: 'Save',
}

UserForm.propTypes = {
    initialValue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        about: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    submitBtnText: PropTypes.string,
    passwordRequired: PropTypes.bool,
}
