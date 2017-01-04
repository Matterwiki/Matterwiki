<img height=50 src="https://github.com/nshntarora/matterwiki/blob/master/client/assets/logo.png?raw=true" />

### Matterwiki is a simple wiki for teams

People use it to store documentation, notes, culture guidelines, employee onboarding content and everything else they want to.

Setup Instructions:

1. Clone this repository `git clone http://github.com/matterwiki/matterwiki`
2. Run `npm install`
3. Edit `config.js` (present in the project root) and change the `auth_secret` value with any secret phrase.
  **NOTE: This phrase will be used to encode and decode your access tokens. Keep it safe and private**
4. run `npm run build`
5. run `node index`
