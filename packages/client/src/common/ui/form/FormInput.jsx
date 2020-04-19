import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Input as ChakraInput,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/core'

import Icons from '../Icons'
import { IconButton } from '../Buttons'
import FormItemContainer from './FormItemContainer'
import { getHelperTextId, useFormContext } from './utils'

const inputStyles = {
    focusBorderColor: 'primary.100',
}

/* eslint-disable react/prop-types */
function PasswordFormInput({ fieldName, isInvalid, value, ...props }) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size={inputStyles.size}>
            <ChakraInput
                {...inputStyles}
                paddingRight={16}
                {...props}
                id={fieldName}
                name={fieldName}
                isInvalid={isInvalid}
                type={show ? 'text' : 'password'}
                value={value}
                aria-describedby={getHelperTextId(fieldName)}
            />
            {value ? (
                <InputRightElement>
                    <IconButton
                        icon={show ? Icons.FaRegEyeSlash : Icons.FaRegEye}
                        size="xs"
                        aria-label="Show Password"
                        onClick={handleClick}
                        variantColor="gray"
                    />
                </InputRightElement>
            ) : null}
        </InputGroup>
    )
}

function GenericFormInput({ type, fieldName, isInvalid, value, ...props }) {
    return (
        <ChakraInput
            {...inputStyles}
            {...props}
            type={type}
            id={fieldName}
            name={fieldName}
            isInvalid={isInvalid}
            value={value}
            aria-describedby={getHelperTextId(fieldName)}
        />
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
    const { onFieldChange, validationError, isInvalid, value } = useFormContext(
        fieldName,
    )

    // Using `defaultValue` instead of `value` to prevent cursor jumping
    // https://github.com/facebook/react/issues/14904#issuecomment-522213842
    return (
        <FormItemContainer
            fieldName={fieldName}
            helperText={helperText}
            isRequired={isRequired}
            labelText={labelText}
            isInvalid={isInvalid}
            validationError={validationError}>
            {type === 'password' ? (
                <PasswordFormInput
                    {...props}
                    type={type}
                    fieldName={fieldName}
                    isInvalid={isInvalid}
                    defaultValue={value}
                    onChange={onFieldChange}
                />
            ) : (
                <GenericFormInput
                    {...props}
                    type={type}
                    fieldName={fieldName}
                    isInvalid={isInvalid}
                    defaultValue={value}
                    onChange={onFieldChange}
                />
            )}
        </FormItemContainer>
    )
}

FormInput.defaultProps = {
    type: 'text',
    isRequired: false,
    helperText: '',
    labelText: '',
}

FormInput.propTypes = {
    fieldName: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    isRequired: PropTypes.bool,
    labelText: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
}
