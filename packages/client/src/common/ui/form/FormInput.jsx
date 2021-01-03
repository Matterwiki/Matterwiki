import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Input as ChakraInput,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'

import Icons from '../Icons'
import { IconButton } from '../Buttons'
import FormItemContainer from './FormItemContainer'
import { getHelperTextId, useFormContext } from './utils'

export const theme = {
    Input: {
        baseStyle: {
            field: { paddingRight: 16 },
        },
        defaultProps: {
            focusBorderColor: 'primary.100',
        },
    },
}

/* eslint-disable react/prop-types */
export const PasswordFormInput = React.forwardRef(function PasswordFormInput(
    { fieldName, isInvalid, value, ...props },
    ref,
) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup>
            <ChakraInput
                {...props}
                id={fieldName}
                name={fieldName}
                isInvalid={isInvalid}
                type={show ? 'text' : 'password'}
                value={value}
                aria-describedby={getHelperTextId(fieldName)}
                ref={ref}
            />

            <InputRightElement>
                <IconButton
                    icon={show ? <Icons.FaRegEyeSlash /> : <Icons.FaRegEye />}
                    aria-label="Show Password"
                    onClick={handleClick}
                    colorScheme="gray"
                />
            </InputRightElement>
        </InputGroup>
    )
})

export const GenericFormInput = React.forwardRef(function GenericFormInput(
    { type, fieldName, isInvalid, value, ...props },
    ref,
) {
    return (
        <ChakraInput
            {...props}
            type={type}
            id={fieldName}
            name={fieldName}
            isInvalid={isInvalid}
            value={value}
            aria-describedby={getHelperTextId(fieldName)}
            ref={ref}
        />
    )
})
/* eslint-enable react/prop-types */

/**
 * A "batteries included" Input component with customization.
 *
 * ⚠️ This will work only if it is a child to the `<Form/>` component!
 *    We use `FormContext` to provide some common props to this component.
 * @param {*} props
 */
const FormInput = React.forwardRef(function FormInput(
    { fieldName, helperText, isRequired, labelText, type, ...props },
    ref,
) {
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
                    ref={ref}
                />
            ) : (
                <GenericFormInput
                    {...props}
                    type={type}
                    fieldName={fieldName}
                    isInvalid={isInvalid}
                    defaultValue={value}
                    onChange={onFieldChange}
                    ref={ref}
                />
            )}
        </FormItemContainer>
    )
})

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

export default FormInput
