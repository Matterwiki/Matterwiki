/*
This file contains all the endpoints related to topics.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/


// Importing the topics model
var Topics = require('../models/topic.js');

var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {


  app.get('/topics',function(req,res){
    /*
    This is a GET endpoint that responds with the list of all the topics in the topics table
    the topics are present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Topics.forge()
    .fetchAll()
      .then(function (collection) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B123',
          data: collection.toJSON()
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B124',
          data: {

          }
        });
      });
  });


  app.get('/topics/:id',function(req,res){
      /*
      This is a GET endpoint that responds with the topic which has the given ID
      the topic is present in the data object in the returning object.
      the error key in the returning object is a boolen which is false if there is no error and true otherwise
      */
      Topics.forge({id: req.params.id})
      .fetch()
        .then(function (topic) {
          res.json({
            error: {
              error: false,
              message: ''
            },
            code: 'B123',
            data: topic.toJSON()
          });
        })
        .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: error.message
            },
            code: 'B124',
            data: {

            }
          });
        });
    });


  app.get('/topic/:id/articles',function(req,res){
    /*
    This is a GET endpoint that responds with the list of all the articles that belong to a particular topic (topic of given id param)
    the articles are present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Topics.where({id: req.params.id}).fetch({withRelated: [{'articles': function(qb) {
            if(req.query.count)
                qb.limit(req.query.count);
             qb.orderBy("updated_at","DESC");
         }}]}).then(function(topic) {
      res.status(200).json({
        error: {
          error: false,
          message: ''
        },
        code: 'B129',
        data: topic.related('articles')
      });
    })
    .catch(function(error){
      res.status(500).json({
        error: {
          error: true,
          message: error.message
        },
        code: 'B130',
        data: {

        }
      })
    });
  });


}
