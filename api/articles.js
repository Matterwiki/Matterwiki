/*
This file contains all endpoints related to articles.
The endpoint to display articles related to a particular topic (/topics/:id/articles)
is not in this file because that is a topics endpoint.
To avoid any confusion, here is how you filter which file should an endpoint belong to.
Check the first word in the url. If topics comes first (as it does in the above example)
then move it to the topics endpoints file.
*/


// Importing the articles model
var Articles = require('../models/article.js');
var Topics = require('../models/topic.js');
var Archives = require('../models/archive.js');
var Users = require('../models/user.js');

var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports =  function(app){


  app.post('/articles',function(req,res){
    /*
    This endpoint takes the article title, article body, and topic id from the request body.
    It then saves those values in the database using the insert query.
    After the operation is complete the endpoint returns the success object.
    TODO: create formal guidelines for different object structures and follow that throughout the API.
    */
    Articles.forge().save({
        title: req.body.title,
        body: req.body.body,
        topic_id: req.body.topic_id,
        user_id: req.body.user_id,
        what_changed: "Another drop in the ocean of knowledge"
      }).then( function (article) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B103',
          data: article
        });     // responds back to request
     })
     .catch(function (error) {
       res.status(500).json({
         error: {
           error: true,
           message: error.message
         },
         code: 'B104',
         data: {

         }
       });
     });
  });


  app.get('/articles',function(req,res){
    /*
    This is a GET endpoint that responds with the list of all the articles in the articles table
    the articles are present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Articles.forge()
    .query(function(qb) {
        if(req.query.count)
          qb.limit(req.query.count);
        qb.orderBy('updated_at','DESC');
    })
    .fetchAll()
      .then(function (collection) {
        res.json({
          error: {
            error: false,
            message: ""
          },
          code: 'B105',
          data: collection.toJSON()
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B106',
          data: {

          }
        });
      });
  });


  app.put('/articles',function(req,res){
    /*
    This is a PUT endpoint for updating an article information.
    It takes the id of the topic to be updated and then updates it with the new object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise

    TODO: Add updates only for columns that are in the request body. Handle exceptions.
    */
    Articles.forge({id: req.body.id}).fetch().then(function(article){
        Articles.forge({id: req.body.id})
          .save({
            title: req.body.title,
            body: req.body.body,
            topic_id: req.body.topic_id,
            what_changed: req.body.what_changed,
            user_id: req.body.user_id
          })
          .then(function() {
              Archives.forge().save({
                article_id: req.body.id,
                title: article.attributes.title,
                body: article.attributes.body,
                what_changed: article.attributes.what_changed,
                user_id: article.attributes.user_id
              })
              .then(function(article){
                  res.json({
                    error: {
                      error: false,
                      message: ''
                    },
                    code: 'B107',
                    data: article
                  });
              })
            })
    })
    .catch(function(error){
      res.status(500).json({
        error: {
          error: true,
          message: error.message
        },
        code: 'B108',
        data: {

        }
      });
    });
    });



  app.get('/articles/compare',function(req,res){
    /*
    This is a GET endpoint that takes IDs of two articles as parameters.
    It then returns both the article which could then be compared with each other
    through diffing which will be done on the front-end.
    The IDs params names are:
    article1: id of the first article
    article2: id of the second article
    The article with ID article1 is the first object in the Data array.
    The article with ID article2 is the second object in the Data array.
    The error key in the returning object is a boolen which is false if there is no error and true otherwise
    */

    Articles.forge({id: req.query.article1})
    .fetch()
      .then(function (article1) {
        Articles.forge({id: req.query.article2}).fetch().then(function(article2){
          result = [];
          result.push(article1.toJSON());
          result.push(article2.toJSON());
        }).then(function(){
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'B111',
              data: result
            });
        })
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B112',
          data: {

          }
        });
      });
  });


  app.get('/articles/:id/',function(req,res){
    /*
    This is a GET endpoint that responds with one article of the specific ID (identified through the ID param)
    the article is present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Articles.forge({id: req.params.id})
    .fetch()
      .then(function (article) {
        Topics.forge({id: article.attributes.topic_id}).fetch().then(function(topic){
          articleObj = article.toJSON();
          topicObj = topic.toJSON();
          articleObj.topic = topicObj;
        }).then(function(){
          Users.forge({id: articleObj.user_id}).fetch().then(function(user){
            userObj = user.toJSON();
            articleObj.user = {
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
              data: articleObj
            });
        })
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


  app.get('/articles/:id/history',function(req,res){
    /*
    This is a GET endpoint that responds with previous versions of the
    article of the specific ID (identified through the ID param).
    The article is present in the data object in the returning object.
    The error key in the returning object is a boolen which is false if there is no error and true otherwise
    */

    Articles.where({id: req.params.id}).fetch({withRelated: [{'archives': function(qb) {
             qb.orderBy("updated_at","DESC");
         }}]}).then(function(article) {
      res.status(200).json({
        error: {
          error: false,
          message: ''
        },
        code: 'B115',
        data: article.related('archives')
      });
    })
    .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B116',
          data: {

          }
        });
    });
  });



}
