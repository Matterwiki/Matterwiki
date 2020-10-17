import wretch from 'wretch'
import _get from 'lodash/get'

import safeJsonParse from './safe-json-parse'
import { authStore } from '../store/auth-store'

const parseJsonError = e => safeJsonParse(e.message, {})

/**
 * Handles HTTP 400 errors
 *
 * TODO: Cleanup as part of https://github.com/Matterwiki/Matterwiki/projects/3#card-35370353
 *
 * @param {*} err
 */
function handleHttp400(err) {
    err.jsonError = parseJsonError(err)
    err.message = err.jsonError.message
    err.isApiValidatorError =
        _get(err, 'jsonError.error.code') === 'VALIDATION_ERR'

    throw err
}

/**
 * Handles HTTP 500 errors
 *
 * TODO: Add ability to create a log and redirect to Matterwiki/issues
 *
 * @param {*} err
 */
function handleHttp500(err) {
    err.jsonError = parseJsonError(err)
    err.message = 'Unknown server error.'
    throw err
}

/**
 * Handles HTTP 409 errors
 * @param {*} err
 */
function handleHttp409(err) {
    err.jsonError = parseJsonError(err)
    err.message = err.jsonError.message
    throw err
}

/**
 * Handles HTTP 401 errors
 * @param {*} err
 */
function handleHttp401(err) {
    err.jsonError = parseJsonError(err)
    err.message = err.jsonError.message

    authStore.getState().logout()
    throw err
}

/**
 * Handles HTTP 405 errors
 * @param {*} err
 */
function handleHttp405(err) {
    err.jsonError = parseJsonError(err)
    err.message = err.jsonError.message
    throw err
}

/**
 * API Helper.
 * This is a function because we'd like this to executed everytime.
 */
export default function apiHelper() {
    const authToken = authStore.getState().getToken()

    return wretch()
        .url(`/api/`)
        .headers({
            'x-access-token': authToken,
        })
        .catcher(400, handleHttp400)
        .catcher(500, handleHttp500)
        .catcher(409, handleHttp409)
        .catcher(401, handleHttp401)
        .catcher(405, handleHttp405)
}
