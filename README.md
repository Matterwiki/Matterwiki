<img src="https://github.com/Matterwiki/matterwiki.github.io/blob/master/assets/logo-header.png?raw=true" />

# Development setup

This will hopefully be automated at a later point, but for now, this should be a rough list of steps to follow.

* Clone the repo.
* Ensure you have `nvm`. `cd` into the codebase and run `nvm use` and follow the instructions that come up, if any.
* Setup a MySQL server instance, using docker. It is recommended that the mysql@5 image is used. Replace **ENTER PASSWORD** in the command below.

```
docker run --name=mysql -e MYSQL_ROOT_PASSWORD=**ENTER PASSWORD** -p 3307:3306 -d mysql:5
```

* Copy the contents of `packages/api/.example.env` and paste them into a new file called called `.env` in `packages/api`.
* Fill up all the necessary info.
* From the root of the repo, run `npm install`.
* After it's done, run `npm run db:localsetup`. This will create a db called `matterwiki_dev` in the docker db.
* To run tests, run `npm test`.
* To start the UI and API projects, run `npm start`. 
* Follow onscreen instructions and you'll be ready to go!