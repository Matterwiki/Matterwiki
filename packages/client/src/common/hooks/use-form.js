import { useState, useCallback } from 'react'
import _cloneDeep from 'lodash/cloneDeep'
import _isFunction from 'lodash/isFunction'

/**
 * Simple hook that deals with some form boilerplate.
 *
 * ⚠️ We should be wary about adding more functionality to
 *    this hook; we could very well use Formik/react-hook-form
 *    at that point!
 *
 * @param {Object} initialValue - An object representing the form data.
 *                                The property names must match the `name` attribute on the html element!
 */
export default function useForm(initialValue) {
    const [value, setValue] = useState(_cloneDeep(initialValue) || {})

    const setFieldValue = useCallback((propName, propValue) => {
        setValue(v => ({ ...v, [propName]: propValue }))
    }, [])

    return [
        value,

        /**
         * A generic change handler that makes updates form data
         * @param {*} e - React's Synthetic event
         */
        function handleChange(e) {
            e.persist()
            setFieldValue(e.target.name, e.target.value)
        },

        /**
         * A submit function that can run an async action
         * @param {*} submitFn - A function that posts form data to the server
         */
        function handleSubmit(submitFn) {
            submitFn = _isFunction(submitFn) ? submitFn : Promise.resolve

            return async e => {
                e.preventDefault()
                e.stopPropagation()
                return submitFn(value)
            }
        },

        /**
         * Used for one-off scenarios where a value is set directly, not through
         * onChange handlers
         */
        setFieldValue,
    ]
}
