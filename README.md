<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/logo-header.png?raw=true" />


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
5. At this point, running this with a process manager like [PM2](http://pm2.keymetrics.io/) would ensure that this is a process running in the background and doesn't die out.  A sample way of starting the app would be:

  ```
  NODE_ENV=production PORT=8000 pm2 start index.js --name "matterwiki"
  ```
  `NODE_ENV` could take one of these two values, `dev` and `production`. Make sure you checkout the [API of PM2](http://pm2.keymetrics.io/docs/usage/cluster-mode/) for full control of this setup. However, if you're just looking to test this, `node index.js` should do the trick.
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
