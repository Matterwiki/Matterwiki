import React from 'react'
import PropTypes from 'prop-types'
import { useAsyncCallback } from 'react-async-hook'
import _get from 'lodash/get'
import _merge from 'lodash/merge'

import { useForm } from '@/common/hooks'
import { FormInput, Button, ErrorAlert } from '@/common/ui'

const getDefaultTopicData = () => ({
    name: '',
    description: '',
})

/**
 * Basic topic form
 * @param {*} props
 */
export default function TopicForm({ initialValue, onSubmit }) {
    const [values, handleChange, handleSubmit] = useForm(
        _merge(getDefaultTopicData(), initialValue),
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
                    placeholder="P.P.C MoM"
                    {...commonProps}
                />
                <FormInput
                    fieldName="description"
                    isRequired={true}
                    labelText="Description"
                    placeholder="Party Planning Committee's meeting notes"
                    type="description"
                    {...commonProps}
                />
                <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    marginY={4}
                    width="full"
                    type="submit">
                    Save
                </Button>
            </form>
        </>
    )
}

TopicForm.propTypes = {
    initialValue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    passwordRequired: PropTypes.bool,
}
