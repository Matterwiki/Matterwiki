var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Topic = require('./topic');

var Article = bookshelf.Model.extend({
  tableName: 'articles',
  topic: function() {
    return this.hasOne('Topic','topic_id');
  }
});

module.exports = bookshelf.model('Article',Article);
