/**
 * Quick safe JSON parse util. Saves us from crazy amounts of `try..catch`!
 * @param {*} string
 * @param {*} defaultValue
 */
export default function safeJsonParse(jsonString, defaultValue) {
    try {
        return JSON.parse(jsonString)
    } catch (error) {
        return defaultValue
    }
}
