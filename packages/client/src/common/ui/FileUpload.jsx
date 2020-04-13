import React from 'react'
import PropTypes from 'prop-types'
import { Input, PseudoBox } from '@chakra-ui/core'

import { Button } from './Buttons'
import Icons from './Icons'

const defaultProps = {
    accept: '',
    multiple: false,
    label: 'Choose a file to upload',
}

const propTypes = {
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    label: PropTypes.string,
    fieldName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

function FileInputWrapper(props) {
    return (
        <PseudoBox
            role="group"
            fontSize="md"
            position="relative"
            overflow="hidden"
            display="inline-block"
            {...props}
        />
    )
}

function FileInput(props) {
    return (
        <Input
            type="file"
            width="full"
            height="full"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            cursor="pointer"
            opacity={0}
            padding={0}
            zIndex="10"
            {...props}
        />
    )
}

/**
 * File upload component that looks like a bordered box
 *
 * TODO: Drag n Drop support
 *
 * @param {*} props
 */
export function FileUploadBox({
    label,
    fieldName,
    onChange: handleChange,
    accept,
    multiple,
}) {
    return (
        <FileInputWrapper>
            <FileInput
                name={fieldName}
                onChange={handleChange}
                accept={accept}
                multiple={multiple}
            />
            <PseudoBox
                width="full"
                padding={4}
                borderStyle="dashed"
                borderWidth="2px"
                borderColor="gray.400"
                textAlign="center"
                color="text"
                _groupHover={{
                    borderColor: 'primary.400',
                    color: 'primary.400',
                }}>
                {label}
            </PseudoBox>
        </FileInputWrapper>
    )
}

FileUploadBox.defaultProps = defaultProps
FileUploadBox.propTypes = propTypes

/**
 * File upload component that looks like a button
 *
 * @param {*} props
 */
export function FileUploadButton({
    label,
    fieldName,
    onChange: handleChange,
    accept,
    multiple,
}) {
    return (
        <FileInputWrapper>
            <FileInput
                name={fieldName}
                onChange={handleChange}
                accept={accept}
                multiple={multiple}
                height={8}
            />
            <Button
                leftIcon={Icons.FaUpload}
                _groupHover={{
                    backgroundColor: 'primary.600',
                }}>
                {label}
            </Button>
        </FileInputWrapper>
    )
}

FileUploadButton.defaultProps = defaultProps
FileUploadButton.propTypes = propTypes
