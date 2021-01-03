import React from 'react'
import PropTypes from 'prop-types'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import { getHelperTextId } from './utils'

export default function FormItemContainer({
    children,
    fieldName,
    helperText,
    isRequired,
    labelText,
    isInvalid,
    validationError,
}) {
    return (
        <FormControl
            isRequired={isRequired}
            key={fieldName}
            isInvalid={isInvalid}>
            {labelText ? (
                <FormLabel fontSize="sm" htmlFor={fieldName}>
                    {labelText}
                </FormLabel>
            ) : null}
            {children}
            {helperText ? (
                <FormHelperText
                    marginTop={0}
                    fontSize="xs"
                    id={getHelperTextId(fieldName)}>
                    {helperText}
                </FormHelperText>
            ) : null}
            {validationError ? (
                <FormErrorMessage>{validationError}</FormErrorMessage>
            ) : null}
        </FormControl>
    )
}

FormItemContainer.defaultProps = {
    isRequired: false,
    isInvalid: false,
    helperText: '',
    labelText: '',
}

FormItemContainer.propTypes = {
    children: PropTypes.node.isRequired,
    fieldName: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    isRequired: PropTypes.bool,
    labelText: PropTypes.string,
    isInvalid: PropTypes.bool,
    validationError: PropTypes.any,
}
