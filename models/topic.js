var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Article = require('./article');

var Topic = bookshelf.Model.extend({
  tableName: 'topics',
  articles: function() {
    return this.hasMany('Article');
  }
});

module.exports = bookshelf.model('Topic',Topic);
