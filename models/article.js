var bookshelf = require('../bookshelf');

var Article = bookshelf.Model.extend({
  tableName: 'articles',
  /*author: function() {
    return this.belongsTo(Users);
  }*/
});

module.exports = Article;
