var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Articles = require('./article');

var Archives = bookshelf.Model.extend({
  tableName: 'archives',
  articles: function() {
    return this.belongsTo('Articles','article_id');
  }
});

module.exports = bookshelf.model('Archives',Archives);
