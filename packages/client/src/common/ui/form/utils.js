import { createContext, useContext } from 'react'
import _get from 'lodash/get'

export const getHelperTextId = fieldName => {
    if (!fieldName) return ''
    return `${fieldName.toLowerCase()}-helper-text`
}

export const getFieldError = (error, name) => _get(error, name) || null

/**
 * Hook to unpack `FormContext` and return some useful fields
 *
 * 📝 This is in `./utils` and not in `hooks/` because it is an internal detail and
 *    not used in the app.
 *
 * @param {string} fieldName
 */
export function useFormContext(fieldName) {
    const context = useContext(FormContext)
    const { error, initialData } = context

    if (!fieldName) return context

    const formValidationErrors = _get(error, 'message')
    const validationError = getFieldError(formValidationErrors, fieldName)
    const isInvalid = !!validationError
    const value = _get(initialData, fieldName)

    return {
        // Computed items
        formValidationErrors,

        // Field specific computed items
        validationError,
        isInvalid,
        value,

        // Og properties from context
        ...context,
    }
}

/**
 * Context that gets shared between all form elements within the `Form` component
 *
 * 📝 Do not use this anywhere else! `FormContext` is an internal detail for
 *    communication between form elements.
 */
export const FormContext = createContext({})
