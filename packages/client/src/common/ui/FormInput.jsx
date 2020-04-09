import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {
    Input as ChakraInput,
    InputGroup,
    InputRightElement,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/core'

import Icons from './Icons'
import { IconButton } from './Buttons'
import { FormContext } from './Form'

const inputStyles = {
    focusBorderColor: 'primary.400',
    size: 'md',
    _placeholder: {
        fontSize: '0.8rem',
    },
}

const getHelperTextId = fieldName => `${fieldName.toLowerCase()}-helper-text`
const getFieldError = (error, name) => _get(error, name) || null

/* eslint-disable react/prop-types */
function FormInputWrapper({
    children,
    fieldName,
    helperText,
    isRequired,
    labelText,
    validationError,
}) {
    const fieldValidationError = getFieldError(validationError, fieldName)

    return (
        <FormControl
            isRequired={isRequired}
            key={fieldName}
            isInvalid={!!fieldValidationError}>
            <FormLabel htmlFor={fieldName}>{labelText}</FormLabel>
            {children}
            {helperText ? (
                <FormHelperText fontSize="xs" id={getHelperTextId(fieldName)}>
                    {helperText}
                </FormHelperText>
            ) : null}
            {fieldValidationError ? (
                <FormErrorMessage>{fieldValidationError}</FormErrorMessage>
            ) : null}
        </FormControl>
    )
}

function PasswordFormInput({ nonInputProps, ...inputProps }) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const { fieldName, validationError, values } = nonInputProps
    const isInvalid = !!getFieldError(validationError, fieldName)

    return (
        <FormInputWrapper {...nonInputProps}>
            <InputGroup size={inputStyles.size}>
                <ChakraInput
                    {...inputStyles}
                    paddingRight={16}
                    id={fieldName}
                    name={fieldName}
                    isInvalid={isInvalid}
                    {...inputProps}
                    type={show ? 'text' : 'password'}
                    value={values[fieldName]}
                    aria-describedby={getHelperTextId(fieldName)}
                />
                <InputRightElement>
                    <IconButton
                        icon={show ? Icons.FaRegEyeSlash : Icons.FaRegEye}
                        size="xs"
                        aria-label="Show Password"
                        onClick={handleClick}
                        variantColor="gray"
                    />
                </InputRightElement>
            </InputGroup>
        </FormInputWrapper>
    )
}

function GenericFormInput({ nonInputProps, ...inputProps }) {
    const { fieldName, validationError, values } = nonInputProps
    const isInvalid = !!getFieldError(validationError, fieldName)

    return (
        <FormInputWrapper {...nonInputProps}>
            <ChakraInput
                {...inputStyles}
                id={fieldName}
                name={fieldName}
                isInvalid={isInvalid}
                value={values[fieldName]}
                {...inputProps}
                aria-describedby={getHelperTextId(fieldName)}
            />
        </FormInputWrapper>
    )
}
/* eslint-enable react/prop-types */

/**
 * A "batteries included" Input component with customization.
 *
 * ⚠️ This will work only if it is a child to the `<Form/>` component!
 *    We use `FormContext` to provide some common props to this component.
 * @param {*} props
 */
export default function FormInput({
    fieldName,
    helperText,
    isRequired,
    labelText,
    type,
    ...props
}) {
    const { error, initialData, onFieldChange } = useContext(FormContext)

    const nonInputProps = {
        fieldName,
        helperText,
        isRequired,
        labelText,
        validationError: _get(error, 'message'),
        values: initialData,
    }

    if (type === 'password')
        return (
            <PasswordFormInput
                {...props}
                type={type}
                nonInputProps={nonInputProps}
                onChange={onFieldChange}
            />
        )
    return (
        <GenericFormInput
            {...props}
            type={type}
            nonInputProps={nonInputProps}
            onChange={onFieldChange}
        />
    )
}

FormInput.defaultProps = {
    type: 'text',
    isRequired: false,
    helperText: '',
}

FormInput.propTypes = {
    fieldName: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    isRequired: PropTypes.bool,
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
}
