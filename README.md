<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/logo-header.png?raw=true" />

<hr/>
[![OpenCollective](https://opencollective.com/matterwiki/backers/badge.svg)](#backers) 
[![OpenCollective](https://opencollective.com/matterwiki/sponsors/badge.svg)](#sponsors)

## What is a wiki?
A website or database developed collaboratively by a community of users, allowing any user to add and edit content. Example: Wikipedia

## Why do you need a wiki?
As your company grows it becomes difficult to keep track of all the knowledge in your team. It is difficult to communicate every detail about the company policies to new team members. Things get lost in Slack channels. It becomes difficult to keep things in context.

A wiki helps you keep track of all this information. Every article is filed under a topic to keep things organised among departments. Everything is transparent, who made what changes to which document and when.

## Why Matterwiki?
Wiki softwares are too complicated for small teams. Matterwiki is just that, a simple wiki for teams to store and collaborate on knowledge.
People use it to store documentation, notes, culture guidelines, employee onboarding content and everything else they want to.


## Setup Instructions:

You need to have `Node` and `npm` installed on your system.

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
As we use `Knex` as a query builder all you have to do use MySQL is to change the db object in `knexfile.js` (found the app root directory).

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

Before you create a new feature request please check our [public roadmap](https://trello.com/b/OktmtAve/feature-roadmap). It lists the features we're working on and the ones we will be working on.
If you see we're already working on your feature, head to the issue relating to that and give a thumbs up.
If your feature is something that hasn't been requested yet, please create an issue.

## Support

### Backers
Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/Matterwiki#backer)]

<a href="https://opencollective.com/Matterwiki/backer/0/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/1/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/2/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/3/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/4/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/5/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/6/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/7/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/8/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/9/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/10/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/11/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/12/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/13/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/14/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/15/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/16/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/17/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/18/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/19/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/20/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/21/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/22/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/23/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/24/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/25/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/26/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/27/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/28/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/backer/29/website" target="_blank"><img src="https://opencollective.com/Matterwiki/backer/29/avatar.svg"></a>

### Sponsors
Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/Matterwiki#sponsor)]

<a href="https://opencollective.com/Matterwiki/sponsor/0/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/1/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/2/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/3/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/4/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/5/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/6/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/7/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/8/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/9/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/10/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/11/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/12/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/13/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/14/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/15/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/16/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/17/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/18/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/19/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/20/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/21/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/22/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/23/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/24/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/25/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/26/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/27/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/28/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/Matterwiki/sponsor/29/website" target="_blank"><img src="https://opencollective.com/Matterwiki/sponsor/29/avatar.svg"></a>

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
