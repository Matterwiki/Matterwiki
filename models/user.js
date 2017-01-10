var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');

var Articles = require('./article.js');

var User = bookshelf.Model.extend({
  tableName: 'users',
  articles: function(){
    return this.hasMany('Articles');
  }
});

module.exports = bookshelf.model('User',User);
