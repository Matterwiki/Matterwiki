import React, { useState } from 'react'
import PropTypes from 'prop-types'
import isUrl from 'is-url'

import { Stack, Box } from '@chakra-ui/react'

import { Form, FormInput, IconButton, Icons, Link } from '@/common/ui'
import { useForm } from '@/common/hooks'

/**
 * Fabricates a server validation error
 *
 * TODO: There probably a better way to do this?
 * @param {*} url
 */
function getValidationError(url) {
    if (isUrl(url)) return null

    const validationError = new Error('Error')
    validationError.isApiValidatorError = true
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
            <Box>
                <FormInput
                    size="sm"
                    labelText="Link"
                    isRequired
                    fieldName="url"
                    placeholder="https://google.com"
                    ref={firstFieldRef}
                />
            </Box>
            <Stack isInline spacing={1} justifyContent="space-between">
                {url ? (
                    <IconButton
                        icon={Icons.FaTrashAlt}
                        onClick={onLinkRemove}
                        colorScheme="gray"
                    />
                ) : null}
                <Stack isInline>
                    <IconButton
                        icon={Icons.FaCheck}
                        onClick={handleSubmit}
                        type="submit"
                    />
                    {url ? (
                        <IconButton
                            as={Link}
                            href={url}
                            target="_blank"
                            icon={Icons.FaExternalLinkAlt}
                            colorScheme="gray"
                        />
                    ) : null}
                </Stack>
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
