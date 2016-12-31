/*
This file contains all the endpoints related to topics.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/


// Importing the topics model
var Topics = require('../models/topic.js');

var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {


  app.post('/topics',function(req,res){
    /*
    This endpoint takes the topic name and topic description from the request body.
    It then saves those values in the database using the insert query.
    */
    Topics.forge().save({name: req.body.name, description: req.body.description}).then( function (topic) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B121',
          data: topic.toJSON()
        });     // responds back to request
     })
     .catch(function(error){
       res.status(500).json({
         error: {
           error: true,
           message: error.message
         },
         code: 'B122',
         data: {

         }
       })
     })
  });


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


  app.put('/topics',function(req,res){
    /*
    This is a PUT endpoint for updating a topic information.
    It takes the id of the topic to be updated and then updates it with the new object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise

    TODO: Add updates only for columns that are in the request body. Handle exceptions.
    */
    Topics.forge({id: req.body.id})
    .save({name: req.body.name, description: req.body.description})
      .then(function(topic) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B125',
          data: topic
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B126',
          data: {

          }
        });
      });
  });


  app.delete('/topics',function(req,res){
    /*
    This is a DELETE endpoint for delete a complete topic from the database.
    It takes the id of the topic and then delete that record from the database.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */

    Topics.forge({id: req.body.id})
    .destroy()
      .then(function() {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B127',
          data: {

          }
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B128',
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
