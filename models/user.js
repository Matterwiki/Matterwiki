var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Article = require('./article');

var User = bookshelf.Model.extend({
  tableName: 'users',
  articles: function(){
    return this.hasMany('Article');
  }
});

module.exports = bookshelf.model('User',User);
