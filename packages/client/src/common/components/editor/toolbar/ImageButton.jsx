import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSlate } from 'slate-react'
import { useAsyncCallback } from 'react-async-hook'
import { useToast } from '@chakra-ui/core'

import { FileUploadWrapper, Icons } from '@/common/ui'

import EditorIconButton from './EditorIconButton'
import { insertImage } from '../utils'

export default function ImageButton({ imageUploadHandler }) {
    const editor = useSlate()
    const toast = useToast()

    const { loading, error, execute } = useAsyncCallback(async ([file]) => {
        // TODO: Will have to change when we upload to S3/Cloudinary, etc.
        const fileName = await imageUploadHandler(file)
        insertImage(editor, `/static/${fileName}`)
    }, [])

    const renderButton = useCallback(
        handleMouseDown => {
            return (
                <EditorIconButton
                    isLoading={loading}
                    icon={Icons.FaImage}
                    isActive={false}
                    onMouseDown={handleMouseDown}
                />
            )
        },
        [loading],
    )

    if (error) {
        toast({
            title: 'Could not upload image 😢',
            status: 'error',
        })
    }

    return (
        <FileUploadWrapper
            accept=".png,.gif,.jpg,.jpeg"
            multiple={false}
            fieldName="image-upload-button"
            onChange={execute}
            render={renderButton}
        />
    )
}

ImageButton.propTypes = {
    imageUploadHandler: PropTypes.func.isRequired,
}
