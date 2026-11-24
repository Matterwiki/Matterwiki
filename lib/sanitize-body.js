/*
 * Article and archive bodies are rendered on the client with
 * dangerouslySetInnerHTML, so they are an HTML injection sink. Every body is
 * sanitized with an allowlist both on write and on read (the Bookshelf model
 * `parse` hook) so that rows stored before this fix are covered as well.
 */
var sanitizeHtml = require('sanitize-html');

var ARTICLE_HTML_OPTIONS = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span',
    's', 'del', 'ins', 'mark', 'sub', 'sup', 'figure', 'figcaption', 'img'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    '*': ['class']
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', {rel: 'noopener noreferrer'})
  }
};

module.exports = function sanitizeBody(body) {
  return typeof body === 'string' ? sanitizeHtml(body, ARTICLE_HTML_OPTIONS) : body;
};
