<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/logo-header.png?raw=true" />

<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/header-tagline.png?raw=true" />

People use it to store documentation, notes, culture guidelines, employee onboarding content and everything else they want to.

## Setup Instructions:

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

<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/footer-img.png?raw=true" />
