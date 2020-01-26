/**
 * Function that returns arguments for the pagination andWhere query
 * @param {object} queryParams
 * @param {string} sortColumn
 * @returns {array}
 */
const getCursorQuery = (queryParams, sortColumn = 'updated_at') => {
  if (!queryParams.cursor) return [sortColumn, '<', new Date()]
  return [sortColumn, '>', new Date(queryParams.cursor)]
}

module.exports = {
  getCursorQuery
}
