import React from 'react'
import PropTypes from 'prop-types'
import { useAsyncCallback } from 'react-async-hook'
import _merge from 'lodash/merge'

import { useForm } from '../hooks'
import { Form, FormInput, Button } from '../ui'

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

    return (
        <Form
            error={error}
            initialData={values}
            onFieldChange={handleChange}
            onSubmit={execute}>
            <FormInput
                isRequired
                fieldName="name"
                labelText="Name"
                placeholder="Ward Cunningham"
            />
            <FormInput
                isRequired
                fieldName="email"
                labelText="Email"
                placeholder="ward@cunningham.com"
                type="email"
            />
            <FormInput
                fieldName="password"
                helperText="Keep this secure. If lost, this cannot be recovered!"
                isRequired={passwordRequired}
                labelText="Password"
                placeholder="MakeItSecureAsMuchAsPossible"
                type="password"
            />
            <FormInput
                fieldName="about"
                labelText="About"
                placeholder="I make wiki software 📖"
            />
            <Button isLoading={loading} loadingText="Submitting" type="submit">
                {submitBtnText}
            </Button>
        </Form>
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
