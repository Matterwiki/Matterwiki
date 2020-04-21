import React from 'react'
import PropTypes from 'prop-types'
import _merge from 'lodash/merge'
import { useAsyncCallback } from 'react-async-hook'
import { Box } from '@chakra-ui/core'

import { Editor } from '@/common/components'
import {
    Form,
    FormInput,
    Button,
    FormSelect,
    FormSelectOption,
} from '@/common/ui'
import { useForm } from '@/common/hooks'

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
    {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlinks' }],
    },
    {
        type: 'image',
        url: 'https://source.unsplash.com/kFrdX5IeQzI',
        children: [{ text: '' }],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
    },
    {
        type: 'paragraph',
        children: [{ text: 'Try it out for yourself!' }],
    },
]

const getDefaultState = () => ({
    title: '',
    // content: null,
    // TODO: Remove this later
    content: initialValue,
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
        <Form
            error={error}
            initialData={values}
            onFieldChange={handleChange}
            onSubmit={execute}>
            <FormInput
                fieldName="title"
                placeholder="Enter Article Title"
                isRequired
                variant="flushed"
            />

            <Box>
                <Editor
                    initialValue={values.content}
                    onChange={setValueFor.bind('content')}
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
        </Form>
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
