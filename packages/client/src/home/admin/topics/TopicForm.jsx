import React from 'react'
import PropTypes from 'prop-types'
import { useAsyncCallback } from 'react-async-hook'
import _merge from 'lodash/merge'

import { useForm } from '@/common/hooks'
import { Form, FormInput, Button } from '@/common/ui'

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

    return (
        <Form
            error={error}
            initialData={values}
            onFieldChange={handleChange}
            onSubmit={execute}>
            <FormInput
                fieldName="name"
                isRequired={true}
                labelText="Name"
                placeholder="P.P.C MoM"
            />
            <FormInput
                fieldName="description"
                isRequired={true}
                labelText="Description"
                placeholder="Party Planning Committee's meeting notes"
                type="description"
            />
            <Button isLoading={loading} loadingText="Submitting" type="submit">
                Save
            </Button>
        </Form>
    )
}

TopicForm.propTypes = {
    initialValue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
}
