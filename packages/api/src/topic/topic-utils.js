/**
 * Sets up defaults for query filters
 * @param {object} filters
 * @returns
 */
exports.withDefaultFilterParams = function withDefaultFilterParams(filters) {
    filters = filters || {}
    const {
        orderField,
        orderStyle,
        searchTerm,
        paging,
        pageNo,
        pageSize,
    } = filters

    return {
        orderField: orderField || 'name',
        orderStyle: orderStyle || 'asc',
        searchTerm: searchTerm || '',
        paging: paging === 'true',
        pageNo: paging ? pageNo || 0 : null,
        pageSize: paging ? pageSize || 10 : null,
    }
}
