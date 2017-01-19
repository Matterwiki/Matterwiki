/*
This file contains all the endpoints which are accessible only to the admin.
The endpoints are
GET /users
POST /users
PUT  /users
DELETE  /users
NOTE:
The above users endpoints are not present in this file as they are all the users
endpoints this API has, they are present in a separate file, users.js
All those still come under the ADMIN endpoints

POST /logo
POST /topics
PUT /topics
DELETE /topics
DELETE /articles
*/


var multer  = require('multer');
var path = require('path');
var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './client/assets'); // Make sure this folder exists
        },
        filename: function(req, file, cb) {
            cb(null, "logo.png");
        }
    });
var upload = multer({ storage: storage }).single('logo');


// Importing the topics model
var Topics = require('../models/topic.js');
var Articles = require('../models/article.js');
var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {

  app.post('/topics',function(req,res){
    res.status(500).json({
      error: {
        error: true,
        message: "Blocked demo Feature"
      },
      code: 'B132',
      data: {

      }
    });
  });

  app.put('/topics',function(req,res){
    res.status(500).json({
      error: {
        error: true,
        message: "Blocked demo Feature"
      },
      code: 'B132',
      data: {

      }
    });
  });


  app.delete('/topics',function(req,res){
    res.status(500).json({
      error: {
        error: true,
        message: "Blocked demo Feature"
      },
      code: 'B132',
      data: {

      }
    });
  });


    app.delete('/articles',function(req,res){
      res.status(500).json({
        error: {
          error: true,
          message: "Blocked demo Feature"
        },
        code: 'B132',
        data: {

        }
      });
    });

    app.post('/logo', function (req, res) {
      res.status(500).json({
        error: {
          error: true,
          message: "Blocked demo Feature"
        },
        code: 'B132',
        data: {

        }
      });
    });

}
