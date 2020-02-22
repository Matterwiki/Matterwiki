const sanitizeHtml = require('sanitize-html')
const natural = require('natural')
const htmlToText = require('html-to-text')
const { pick, merge } = require('lodash')

const { DEFAULT_CHANGELOG_MESSAGE } = require('./article-constants')
const {
    ARTICLE_HISTORY_TYPES,
} = require('../article-history/article-history-constants')

// 📝
// `PorterStemmer.attach()` patches `tokenizeAndStem()` to `String.prototype`
//  as a shortcut to tokenizing and stemming via `PorterStemmer.stem(token)`
natural.PorterStemmer.attach()

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
        topicId,
        paging,
        pageNo,
        pageSize,
    } = filters

    return {
        orderField: orderField || 'modifiedAt',
        orderStyle: orderStyle || 'desc',
        searchTerm: searchTerm ? searchTerm.tokenizeAndStem().join(' ') : '',
        topicId: topicId || null,
        paging: paging === 'true',
        pageNo: paging ? pageNo || 0 : null,
        pageSize: paging ? pageSize || 20 : null,
    }
}

/**
 * Cleans up html content, removes unsafe scripts, etc.
 *
 * @param {string} htmlContent
 */
exports.sanitizeArticleContent = function sanitizeArticleContent(htmlContent) {
    if (!htmlContent) return ''

    return sanitizeHtml(htmlContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    })
}

/**
 * Returns a long string filled with tokens, which are utilized
 * during searches.
 *
 * @param {string} title
 * @param {string} htmlContent
 */
exports.tokenizeArticleFields = function tokenizeArticleFields(
    title,
    htmlContent,
) {
    title = title || ''
    htmlContent = htmlContent || ''

    const plainTextContent = htmlToText.fromString(htmlContent)

    return `${title} ${plainTextContent}`.tokenizeAndStem().join(' ')
}

/**
 * Shorthand for performing ops on the article properties.
 *
 * @param {object} article
 * @param {any} id - id of the article. This is used for building up the article history!
 */
exports.prepareArticleDataForDb = function prepareArticleDataForDbDataForDb(
    article,
    id,
) {
    const content = exports.sanitizeArticleContent(article.content)
    const searchTokens = exports.tokenizeArticleFields(article.title, content)

    const preppedArticle = {
        ...article,
        content,
        searchTokens,
        changeLog: article.changeLog || DEFAULT_CHANGELOG_MESSAGE,
    }

    preppedArticle.articleHistory = merge(
        pick(preppedArticle, ['title', 'content', 'changeLog', 'topicId']),
        {
            type: id
                ? ARTICLE_HISTORY_TYPES.UPDATE
                : ARTICLE_HISTORY_TYPES.CREATE,
        },
    )

    return preppedArticle
}
