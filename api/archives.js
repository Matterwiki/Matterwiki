/*
This file contains all endpoints related to archives
*/

var Articles = require('../models/article.js');
var Topics = require('../models/topic.js');
var Archives = require('../models/archive.js');
var Users = require('../models/user.js');

var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports =  function(app){
  app.get('/archives/:id/',function(req,res){
    /*
    This is a GET endpoint that responds with one article of the specific ID (identified through the ID param)
    the article is present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Archives.forge({id: req.params.id})
    .fetch()
      .then(function (archive) {
        Users.forge({id: archive.attributes.user_id}).fetch().then(function(user){
          archiveObj = archive.toJSON();
          userObj = user.toJSON();
          archiveObj.user = {
            id: userObj.id,
            name: userObj.name,
            email: userObj.email,
            about: userObj.about
          };
        })
        .then(function(){
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'B113',
              data: archiveObj
            });
        })
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B114',
          data: {

          }
        });
      });
  });
}
