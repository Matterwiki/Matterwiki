var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Articles = require('./article');
var sanitizeBody = require('../lib/sanitize-body');

var Archives = bookshelf.Model.extend({
  tableName: 'archives',
  // Sanitize on read so rows written before the fix are covered too.
  parse: function(attrs) {
    if (attrs && Object.prototype.hasOwnProperty.call(attrs, 'body')) {
      attrs.body = sanitizeBody(attrs.body);
    }
    return attrs;
  },
  articles: function() {
    return this.belongsTo('Articles','article_id');
  }
});

module.exports = bookshelf.model('Archives',Archives);
