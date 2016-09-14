var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Topic = require('./topic');
var Archives = require('./archive');

var Article = bookshelf.Model.extend({
  tableName: 'articles',
  topic: function() {
    return this.belongsTo('Topic','topic_id');
  },
  archives: function(){
    return this.hasMany('Archives')
  }
});

module.exports = bookshelf.model('Article',Article);
