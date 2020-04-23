/**
 * normalizes query object and returns permissible values
 */
exports.withDefaultFilterParams = function withDefaultFilterParams(query) {
    const { paging, pageNo, pageSize } = query || {}

    return {
        paging: paging === 'true',
        pageNo: paging ? pageNo || 0 : null,
        pageSize: paging ? pageSize || 20 : null,
    }
}
