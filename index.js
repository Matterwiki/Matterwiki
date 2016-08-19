/*
This is main file which will contain all of our endpoints.
Once we have enough endpoints defined we start breaking them into modules for better code readability
*/

var express = require('express');
var app = express();

app.get('/api',function(req,res){
  res.send("Hey! You're looking at the matterwiki API");
});

app.use(express.static(__dirname + '/client'));

app.listen(5000 || process.env.PORT, function(){
  console.log("The magic is happening on port 5000");
});
