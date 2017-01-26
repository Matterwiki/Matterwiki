/*
This file contains all the endpoints related to users.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/


// Importing the topics model
var Users = require('../models/user.js');
var Topics = require('../models/topic.js');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {

  app.post('/setup',function(req,res){
    /*
    This is a POST endpoint which takes the user name, email, password, and about to create
    a new user profile.
    It responds with the created user object in the data key.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      Users.forge()
        .save({
          id: 1,
          name: req.body.name,
          email: req.body.email,
          password: hash,
          about: req.body.about
        })
        .then(function (collection) {
          Topics.forge().save({name: "general", description: "knowledge for everyone"}).then(function(topic){
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'B131',
              data: collection.toJSON()
            });
          })
        .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: "There was an error creating the admin user. Chances are you've already set up"
            },
            code: 'B132',
            data: {

            }
          })
        });
      });
        });
      });

}
