/*
This file contains all the endpoints related to user authentication.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/


// Importing the topics model
var Users = require('../models/user.js');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
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
          res.json({
            error: {
              error: true,
              message: 'User not found'
            },
            code: 'B117',
            data: {

            }
          });
        }
        else {
          user = user.toJSON();
          bcrypt.compare(req.body.password, user.password, function(err, result) {
              if(result==true)
              {
                var token = jwt.sign(user, app.get('superSecret'), {
                              expiresIn: 86400
                            });
                res.json({
                  error: {
                    error: false,
                    message: ''
                  },
                  code: 'B118',
                  data: {
                    user: {
                      email: user.email,
                      id: user.id
                    },
                    token: token
                  }
                });
              }
              else {
                res.json({
                  error: {
                    error: true,
                    message: 'Email or Password is wrong'
                  },
                  code: 'B119',
                  data: {

                  }
                });
              }
          });
        }

      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B120',
          data: {

          }
        });
      });
  });


}
