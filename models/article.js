var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Topic = require('./topic');
var Archives = require('./archive');
var User = require('./user')

var Article = bookshelf.Model.extend({
  tableName: 'articles',
  topic: function() {
    return this.belongsTo('Topic','topic_id');
  },
  user: function() {
    return this.belongsTo('User','user_id');
  },
  archives: function(){
    return this.hasMany('Archives');
  }
});

module.exports = bookshelf.model('Article',Article);
