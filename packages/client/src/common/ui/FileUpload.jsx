import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Input, PseudoBox } from '@chakra-ui/core'

function FileInputWrapper(props) {
    return (
        <PseudoBox
            role="group"
            position="relative"
            overflow="hidden"
            display="inline-block"
            {...props}
        />
    )
}

/**
 * File upload wrapper that could be used with any element.
 * It's only been used with buttons so far, so YMMV.
 *
 * Any style props passed in will go to the file input hidden in here!
 */
export function FileUploadWrapper({
    fieldName,
    onChange: handleParentChange,
    accept,
    multiple,
    render,
}) {
    const inputRef = useRef()
    const handleChange = useCallback(
        e => {
            e.preventDefault()
            handleParentChange(e.target.files)
        },
        [handleParentChange],
    )

    const triggerChange = () => {
        inputRef.current.value = ''
        // "Trigger" file input click
        inputRef.current.click()
    }

    return (
        <FileInputWrapper>
            <Input
                ref={inputRef}
                name={fieldName}
                onChange={handleChange}
                accept={accept}
                multiple={multiple}
                type="file"
                display="none"
                outline="none"
            />
            {render(triggerChange)}
        </FileInputWrapper>
    )
}

FileUploadWrapper.defaultProps = {
    accept: '',
    multiple: false,
}

FileUploadWrapper.propTypes = {
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    fieldName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    render: PropTypes.elementType.isRequired,
}
