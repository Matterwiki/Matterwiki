/*
This file contains all the endpoints related to user authentication.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/


// Importing the topics model
var Users = require('../models/user.js');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {


  app.post('/api/authenticate',function(req,res){
    /*
    This is a POST endpoint that takes the email and password and returns the JWT
    the token is present in the token key in the data object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */
    Users.forge({email: req.body.email})
    .fetch()
      .then(function (user) {
        if(!user){
          res.json({error: true, data: {message: "the user does not exist"}});
        }
        else {
          user = user.toJSON();
          bcrypt.compare(req.body.password, user.password, function(err, result) {
              if(result==true)
              {
                var token = jwt.sign(user, app.get('superSecret'), {
                              expiresIn: 86400
                            });
                res.json({error: false, data: {user: user.email,token: token}});
              }
              else {
                res.json({error: true, data: {message: "email or password combination wrong"}});
              }
          });
        }

      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  });


}
