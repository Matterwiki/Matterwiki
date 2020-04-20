import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { isUri } from 'valid-url'

import { Stack } from '@chakra-ui/core'

import { Form, FormInput, IconButton, Icons } from '@/common/ui'
import { useForm } from '@/common/hooks'

/**
 * Fabricates a server validation error
 *
 * TODO: There probably a better way to do this?
 * @param {*} url
 */
function getValidationError(url) {
    if (isUri(url)) return null

    const validationError = new Error('Error')
    validationError.isJoiValidationErr = true
    validationError.message = {
        url: 'Not a valid link.',
    }
    return validationError
}

/**
 * Link management form
 * @param {*} props
 */
export default function ManageLinkForm({
    firstFieldRef,
    onLinkAdd,
    onLinkRemove,
    url,
}) {
    const [values, onChange, onSubmit] = useForm({ url: url || '' })
    const [error, setError] = useState(null)

    const handleSubmit = onSubmit(async () => {
        setError(null)

        const validationError = getValidationError(values.url)
        if (validationError) return setError(validationError)

        return onLinkAdd(values.url)
    })

    const handleChange = e => {
        if (error) setError(null)
        onChange(e)
    }

    return (
        <Form
            error={error}
            initialData={values}
            onFieldChange={handleChange}
            onSubmit={onSubmit}>
            <FormInput
                isRequired
                labelText="Link"
                fieldName="url"
                placeholder="https://google.com"
                ref={firstFieldRef}
            />
            <Stack isInline marginTop={3} justifyContent="flex-end">
                <IconButton
                    icon={Icons.FaTrashAlt}
                    onClick={onLinkRemove}
                    variantColor="gray"
                />
                <IconButton
                    icon={Icons.FaCheck}
                    onClick={handleSubmit}
                    type="submit"
                />
            </Stack>
        </Form>
    )
}

ManageLinkForm.propTypes = {
    firstFieldRef: PropTypes.any,
    onLinkRemove: PropTypes.func.isRequired,
    onLinkAdd: PropTypes.func.isRequired,
    url: PropTypes.string,
}
