import React from 'react'
import PropTypes from 'prop-types'
import _merge from 'lodash/merge'
import { useAsyncCallback } from 'react-async-hook'
import { Stack, Box } from '@chakra-ui/core'

import { Editor } from '@/common/components'
import {
    Form,
    FormInput,
    Button,
    FormSelect,
    FormSelectOption,
} from '@/common/ui'
import { useForm } from '@/common/hooks'

const getDefaultState = () => ({
    title: '',
    content: '',
    topicId: '',
})

export default function ArticleForm({ initialValue, topics, onSubmit }) {
    const [values, handleChange, handleSubmit, setValueFor] = useForm(
        _merge(
            getDefaultState(),
            initialValue,
            // TODO: Implement conversion from html -> state state for values.content
        ),
    )

    const { error, execute, loading } = useAsyncCallback(
        handleSubmit(async values => {
            // TODO: Implement serialization from slate state -> html for values.content
            return onSubmit(values)
        }),
    )

    return (
        <Stack
            as={Form}
            error={error}
            initialData={values}
            onFieldChange={handleChange}
            onSubmit={execute}
            spacing={5}
            flexWrap="wrap"
            justifyContent="center">
            <FormInput
                fieldName="title"
                placeholder="Enter Article Title"
                isRequired
                variant="flushed"
            />

            <Box>
                <Editor
                    initialValue={values.content}
                    onChange={editorState =>
                        setValueFor('content', editorState)
                    }
                />
            </Box>

            <FormSelect
                fieldName="topicId"
                isRequired
                placeholder="Select a topic">
                {topics.map(t => (
                    <FormSelectOption value={t.id} key={t.id}>
                        {t.name}
                    </FormSelectOption>
                ))}
            </FormSelect>

            <Button
                isLoading={loading}
                loadingText="Submitting"
                width="full"
                type="submit">
                Save Article
            </Button>
        </Stack>
    )
}

ArticleForm.propTypes = {
    initialValue: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        topicId: PropTypes.number.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired,
}
