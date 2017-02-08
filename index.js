
/*
This is main file which will contain all of our endpoints.
Once we have enough endpoints defined we start breaking them into modules for better code readability
*/


// Importing all the required libraries
var express = require('express');
var bodyParser = require('body-parser'); //body parser to parse the request body
var db = require('./db.js'); //this file contains the knex file import. it's equal to knex=require('knex')
var app = express();
var fs = require('fs');
var apiRoutes = express.Router();
var apiRoutesAdmin = express.Router();
var jwt = require('jsonwebtoken');
var misc = require('./misc.js');
var config = require('./config'); //config file in the app directory which contains the JWT key

process.env.PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV !== 'production') {
  // add some patchwork for the devserver to work!
  require('./webpack-middleware')(app);
}

app.set('superSecret', config.auth_secret); // secret variable

// Using the body parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/api',function(req,res){
  // this is just a sample endpoint I build to see if things are working
  res.send("Hey! You're looking at the matterwiki API");
});

// Importing all endpoints for authentication
require('./api/authentication')(app);

// Importing the setup endpoint
require('./api/setup')(app);

apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks for expiration
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          error: {
            error: true,
            message: 'Failed to authenticate token'
          },
          code: 'B101',
          data: {

          }
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).json({
      error: {
        error: true,
        message: 'No token provided'
      },
      code: 'B102',
      data: {

      }
    });

  }
});


apiRoutesAdmin.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks for expiration
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          error: {
            error: true,
            message: 'Failed to authenticate token'
          },
          code: 'B101',
          data: {

          }
        });
      } else {
        if(decoded.id == 1) {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
        else {
          return res.status(403).json({
            error: {
              error: true,
              message: 'You are not authorized to perform this action'
            },
            code: 'BNOTADMIN',
            data: {

            }
          });
        }
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).json({
      error: {
        error: true,
        message: 'No token provided'
      },
      code: 'B102',
      data: {

      }
    });

  }
});


// Importing all endpoints for articles
require('./api/articles')(apiRoutes);

// Importing all endpoints for topics
require('./api/topics')(apiRoutes);

// Importing all endpoints for users
require('./api/users')(apiRoutesAdmin);

// Importing all endpoints for archives
require('./api/archives')(apiRoutes);

// Importing the search endpoint
require('./api/search')(apiRoutes);

// Importing all endpoints which are only admin accessible
require('./api/admin')(apiRoutesAdmin);


app.use('/api', apiRoutes);
app.use('/api', apiRoutesAdmin);

app.use(express.static(__dirname + '/client'));

app.listen(process.env.PORT, function(){
  console.log("The magic is happening on port %s", process.env.PORT);
});
