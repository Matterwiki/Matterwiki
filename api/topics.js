/*
This file contains all the endpoints related to topics.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/


// Importing the topics model
var Topics = require('../models/topic.js');

var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {


  app.post('/api/topics',function(req,res){
    /*
    This endpoint takes the topic name and topic description from the request body.
    It then saves those values in the database using the insert query.
    */
    db('topics').insert({name: req.body.name, description: req.body.description}).then( function (result) {
        res.json({ success: true, message: 'ok' });     // responds back to request
     })
  });


  app.get('/api/topics',function(req,res){
    /*
    This is a GET endpoint that responds with the list of all the topics in the topics table
    the topics are present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Topics.forge()
    .fetchAll()
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  });


  app.get('/api/topic/:id/articles',function(req,res){
    /*
    This is a GET endpoint that responds with the list of all the articles that belong to a particular topic (topic of given id param)
    the articles are present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Topics.where({id: req.params.id}).fetch({withRelated: ['articles']}).then(function(topic) {
      res.status(200).json(topic.related('articles'));
    });
  });


}
