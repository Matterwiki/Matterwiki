var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Topic = require('./topic');
var Archives = require('./archive');
var User = require('./user')
var sanitizeBody = require('../lib/sanitize-body');

var Article = bookshelf.Model.extend({
  tableName: 'articles',
  // Sanitize on read so rows written before the fix are covered too.
  parse: function(attrs) {
    if (attrs && Object.prototype.hasOwnProperty.call(attrs, 'body')) {
      attrs.body = sanitizeBody(attrs.body);
    }
    return attrs;
  },
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
