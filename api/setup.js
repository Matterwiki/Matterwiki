/*
This file contains all the endpoints related to users.
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/


// Importing the topics model
var Users = require('../models/user.js');
var Topics = require('../models/topic.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {

  app.post('/setup',function(req,res){

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
