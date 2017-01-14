<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/logo-header.png?raw=true" />


## What is a wiki?
A website or database developed collaboratively by a community of users, allowing any user to add and edit content. Example: Wikipedia

## Why do you need a wiki?
As your company grows it becomes difficult to keep track of all the knowledge in your team. It is difficult to communicate every detail about company policies to new team members. Things get lost in Slack channels. It becomes difficult to keep things in context.

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
5. run `node index`
6. Head to `yoururl.com/#/setup` and create the Admin account.

  _Replace yoururl.com with your URL. If you're running locally, replace with `localhost:5000`_
7. Login with your new admin account and head to the Admin dashboard.
8. Create topics and add users to your Wiki.

### Under the hood

Matterwiki uses a Node.js API with a React.js front-end and Sqlite3 for the database.

<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/technologies.png?raw=true" />

As the app is built atop a JSON API, it is simple to integrate your Wiki with your mobile app or blog.
For more, read the [API documentation](https://github.com/matterwiki/matterwiki/blob/master/API.md).

### Like it?

:star: this repo

### Found a bug?

Raise an issue!

### Want to contribute?

We welcome all kinds of contributions. It doesn't matter if it's a grammar fix, or some refactoring, or an even an entire UI overhaul. So help us improve Matterwiki for everyone.

### Screenshots

<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/screenshot1.png?raw=true" />
<hr/>
<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/screenshot2.png?raw=true" />
<hr/>
<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/screenshot3.png?raw=true" />
<hr/>
<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/screenshot4.png?raw=true" />
<hr/>

<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/footer-img.png?raw=true" />
