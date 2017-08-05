<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/logo-header.png?raw=true" />

## :warning: Warning
Expect some things to be broken as we're actively working on a stable v0.3.0 release. Although the master branch is expected to work fine, we'd suggest you to wait until everything is completed. 

If you'd like to help, drop in on any of the issues or pull requests, or email one of

* na[dot]nishantarora[at]gmail[dot]com 
* hpkrishna07[at]gmail[dot]com

You can also get a preview of the next version on the `v0.3.0`/`refactor` branches

--------------------

## What is a wiki?
A website or database developed collaboratively by a community of users, allowing any user to add and edit content. Example: Wikipedia

## Why do you need a wiki?
As your company grows it becomes difficult to keep track of all the knowledge in your team. It is difficult to communicate every detail about the company policies to new team members. Things get lost in Slack channels. It becomes difficult to keep things in context.

A wiki helps you keep track of all this information. Every article is filed under a topic to keep things organised among departments. Everything is transparent, who made what changes to which document and when.

## Why Matterwiki?
Wiki softwares are too complicated for small teams. Matterwiki is just that, a simple wiki for teams to store and collaborate on knowledge.
People use it to store documentation, notes, culture guidelines, employee onboarding content and everything else they want to.


## Setup Instructions:

You need to have `Node` (version 7 or above) and `npm` installed on your system.

1. Clone this repository `git clone http://github.com/matterwiki/matterwiki`
2. Run `npm install`
3. Edit `config.js` (present in the project root) and change the `auth_secret` value with any secret phrase.
  **NOTE: This phrase will be used to encode and decode your access tokens. Keep it safe and private**
4. run `npm run build`
5. At this point, running this with a process manager like [PM2](http://pm2.keymetrics.io/) would ensure that this is a background process and doesn't die out.  A sample way of starting the app would be:

  ```
  NODE_ENV=production PORT=8000 pm2 start index.js --name "matterwiki"
  ```
  Some points to note here :
  * `NODE_ENV` could take one of these two values, `dev` or `production`. 
  * `PORT` is optional. If it is not specified, then `5000` would be used.
  
  However, if you do not need all this, running `npm start` should boot up the production build of the app.
6. Head to `yoururl.com/#/setup` and create the Admin account.

  _Replace yoururl.com with your URL. If you're running locally, replace with `localhost:5000`_
7. Login with your new admin account and head to the Admin dashboard.
8. Create topics and add users to your Wiki.


**NOTE - Using MySQL**
<hr/>
By default Matterwiki uses **Sqlite**, which is a lightweight database management system perfect for an internal wiki.
If your team size is huge and you need a concurrent and flexible DBMS you can change the config to use **MySQL**.
As we use `Knex` as a query builder all you have to do use MySQL is to change the db object in `knexfile.js` (found the app root directory). Using MySQL requires MySQL 5.6.5 as a minimum.

1. First [setup MySQL](http://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing)

2. Install mysql from `npm`

   ```
   npm install mysql
   ```

3. Change the object from

```
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: "./db/matterwiki.sqlite"
  },
  useNullAsDefault: true
}
```

to

```
module.exports = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  useNullAsDefault: true
}
```

## Run with Docker:

You can run MatterWiki with Docker.

1. Clone this repository `git clone http://github.com/matterwiki/matterwiki`
2. Run `docker build -t matterwiki .`
3. Start a docker container with `docker run --name=matterwiki -p 5000:5000 matterwiki`

You can add `-v /<path>/db:/server/db` to store the db on the host filesystem, and `-v /<path>/config.js:/server/config.js`
to specify your own JWT secret configuration. Add `--restart=always -d` options to run it as a daemon.


## Under the hood

Matterwiki uses a Node.js API with a React.js front-end and Sqlite3 for the database.

<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/technologies.png?raw=true" />

As the app is built atop a JSON API, it is simple to integrate your Wiki with your mobile app or blog.
For more, read the [API documentation](https://github.com/matterwiki/matterwiki/blob/master/API.md).

## Like it?

:star: this repo

## Found a bug?

Raise an issue!

## Want to contribute?

We welcome all kinds of contributions. It doesn't matter if it's a grammar fix, or some refactoring, or an even an entire UI overhaul. So help us improve Matterwiki for everyone. Take a look at our [contributing document](https://github.com/Matterwiki/Matterwiki/blob/master/CONTRIBUTING.md) for understanding local development setup and the code base.

## Feature requests?

Before you create a new feature request please check our [public roadmap](https://github.com/Matterwiki/Matterwiki/projects/1) for the v0.3.0 release. It lists the features we're currently working on. The issues [tagged with the `backlog` label](https://github.com/Matterwiki/Matterwiki/issues?q=is%3Aissue+is%3Aopen+label%3Abacklog) are next in line. 

* If you see we're already working on your feature, head to the issue relating to that and give a thumbs up.
* If your feature is something that hasn't been requested yet, please create an issue.

## Screenshots

<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/screenshot1.png?raw=true" />
<hr/>
<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/screenshot2.png?raw=true" />
<hr/>
<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/screenshot3.png?raw=true" />
<hr/>
<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/screenshot4.png?raw=true" />
<hr/>

<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/footer-img.png?raw=true" />

## Prior art
If you want to explore alternatives here are some other Wikis we love.

*We're also referring to them for inspiration as we go along.*

1. [Tettra](https://tettra.co), another simple wiki (comes with Slack integration) [PAID].
2. [Jingo](https://github.com/claudioc/jingo), another Node.js based Wiki based on Git.
3. [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki), the code that powers Wikipedia.
4. [Dokuwiki](https://www.dokuwiki.org/), simple text file based wiki
