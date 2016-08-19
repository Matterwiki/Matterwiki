#!/usr/bin/env node

/*
This script will be executed on the command "wiki". It is defined under the "bin" key in the package.json file.
This is where we will write the complete setup script.
Creating tables. Filling them with initial data. Creating the first user.

We're still looking for better names for the command. Should be matterwiki or just wiki?
*/
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/matterwiki.sqlite');

console.log('Installation Started!');

db.serialize(function() {
  db.run("CREATE TABLE articles (title TEXT)");
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
db.close();
