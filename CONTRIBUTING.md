# Contributing to Matterwiki

Thank you for taking the time to contribute! :tada::+1:

## Basic guidelines for contributing
* Start off by [forking this repository](https://github.com/Matterwiki/Matterwiki#fork-destination-box).
* Create a branch to start your work `git checkout -b your-feature-name`
* Commit your work
* Create a pull request

## Local dev setup
* Once you've forked this repo and `clone`d your fork, you would have to run `npm install`.  
* The development server can then be started with `npm run dev`  which serves the JS files, assets and of course, index.html. The default `localhost` URL is [`http://localhost:5000`](http://localhost:5000).
*  For the production version, run `npm start`. 

## The code
*  The `api/` directory contains code for the node backend. [Look at the API guide for more information](https://github.com/matterwiki/matterwiki/blob/master/API.md).
*  The `client/` directory contains the React `jsx` files and basically all the frontend code powering this app.
*  The `models/` directory has the bookshelf models associated with the SQLite DB.

## Features
* The dev setup has webpack's Hot Module Replacement (HMR) enabled, which ([according to the docs](https://webpack.js.org/concepts/hot-module-replacement/)), 

	> exchanges, adds, or removes modules while an application is running without a page reload. 

   This helps improve speedup dev time significantly. 
* We've got sourcemaps enabled, so that makes debugging really easy. 
