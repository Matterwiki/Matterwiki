<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/logo-header.png?raw=true" />

# Development setup

This will hopefully be automated at a later point, but for now, this should be a rough list of steps to follow.

* Clone the repo.
* Ensure you have `nvm`. `cd` into the codebase and run `nvm use` and follow the instructions that come up, if any.
* Setup a MySQL server instance, [preferably in a docker container](https://dzone.com/articles/docker-for-mac-mysql-setup) is recommended. Remember to [allow `mysql_native_password` authentication in the DB server](https://stackoverflow.com/a/50131831/1217785).
* Create `matterwiki_dev` database in the MySQL server. In the future, this will be automated.
* Copy the contents of `packages/api/.example.env` and paste them into a new file called called `.env` in `packages/api`.
* Fill up all the necessary info.
* From the root of the repo, run `npm install`.
* After it's done, run `npm run db:setup`.
* To run tests, run `npm test`.
* To start the UI and API projects, run `npm start`. 
* Follow onscreen instructions and you'll be ready to go!