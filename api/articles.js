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


module.exports =  function(app){


  app.post('/api/articles',function(req,res){
    /*
    This endpoint takes the article title, article body, and topic id from the request body.
    It then saves those values in the database using the insert query.
    After the operation is complete the endpoint returns the success object.
    TODO: create formal guidelines for different object structures and follow that throughout the API.
    */
    db('articles').insert({title: req.body.title, body: req.body.body, topic_id: req.body.topic_id}).then( function (result) {
        res.json({ success: true, message: 'ok' });     // responds back to request
     })
  });


  app.get('/api/articles',function(req,res){
    /*
    This is a GET endpoint that responds with the list of all the articles in the articles table
    the articles are present in the data object in the returning object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Articles.forge()
    .fetchAll()
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  });


}
