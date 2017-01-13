# API Guide

All endpoints except the `/setup` and `/authenticate` need an access token.

The access token can be passed in the following ways

`x-access-token` in the request headers (recommended)

`token` as a URL param

`token` in the request body

All responses follow a uniform structure across all endpoints.

```
{
  "error": {
    "error": "boolean",
    "message": "string"
  },
  "code": "string",
  "data": {
    // Contains the response data. Example: array or all topics for a GET /api/topics request
  }
}
```

Matterwiki database has 4 models/tables.

1. Articles
2. Topics
3. Users
4. Archives

Here is a list of all the endpoints with the action they perform.

## POST `/api/setup`

Create the admin user with id=1.
There is only one admin (as of now) who is identified with his ID.

**Required Params:**

```
name

about

email

password

(the above keys should be present in the request body)

Access Token
```

## POST `/api/authenticate`

Takes the user's email and password and returns the auth token.

**Required Params:**

```
email

password

(the above keys should be present in the request body)
```

## GET `/api/users` (ADMIN ONLY)

Returns a list of all users.

**Required Params:**

`Access Token`

## POST `/api/users` (ADMIN ONLY)

Takes the user's name, about, email and password and creates an account for that user.

**Required Params:**

```
name

about

email

password

(the above keys should be present in the request body)

Access Token
```

## PUT `/api/users` (ADMIN ONLY)

Takes the user's id, name, about, email and password and creates an account for that user.
It first finds the user with the given ID and then updates its profile fields with the given values.

**Required Params:**

```
id

name

about

email

password

(the above keys should be present in the request body)

Access Token
```

## DELETE `/api/users` (ADMIN ONLY)

Takes a user id and deletes the user from the database.

**Required Params:**

```
id

(the above key should be present in the request body)

Access Token
```

## GET `/api/topics`

Returns a list of all topics in the database.

**Required Params:**

`Access Token`

## POST `/api/topics` (ADMIN ONLY)

Takes the topic name and description and creates the topic in the database.

**Required Params:**

```
name

description

(the above keys should be present in the request body)

Access Token
```

## PUT `/api/topics` (ADMIN ONLY)

Takes the topic id, name, about, email and password.
It first finds the topic with the given ID and then updates its profile fields with the given values.

**Required Params:**

```
id

name

description

(the above keys should be present in the request body)

Access Token
```

## DELETE `/api/topics` (ADMIN ONLY)

Takes the id of the topic which has to deleted.

**Required Params:**

```
id

(the above key should be present in the request body)

Access Token
```

## GET `/api/topics/:id/articles`

Returns the list of all the articles filed under the topic with id.
Replace `:id` in the URL with the id of the topic you want to get the articles of.

**Required Params:**

```
id (topic ID in URL)

Access Token
```

## GET `/api/archives/:id`

Returns the archive with the given id.
Replace `:id` in the URL with the id of the archive you want to get.

**Required Params:**

```
id (archive ID in URL)

Access Token
```

## GET `/api/articles`

Returns all the articles in the database

**Required Params:**

`Access Token`

## POST `/api/articles`

Takes the article title, body, topic_id and user_id and creates the record in the database.

**Required Params:**

```
title

body

topic_id

user_id

(the above keys should be present in the request body)

Access Token
```

## PUT `/api/articles`

Takes the article id, title, body, topic_id, user_id.
It first finds the topic with the given ID and then updates its fields with the given values.

**Required Params:**

```
id

title

body

topic_id

user_id

(the above keys should be present in the request body)

Access Token
```

## DELETE `/api/articles` (ADMIN ONLY)

Takes the id of the topic which has to be deleted and removes that entry from the database.

**Required Params:**

```
id

(the above key should be present in the request body)

Access Token
```
## GET `/api/articles/:id`

Returns the article with the given id.
Replace :id in the URL with the id of the article you want to get.

**Required Params:**

```
id (archive ID in URL)

Access Token
```

## GET `/api/articles/:id/history`

Returns all the previous versions of the article with the given id.
Replace :id in the URL with the id of the article you want to get.

**Required Params:**

```
id (article ID in URL)

Access Token
```


## POST `/api/logo` (ADMIN ONLY)

Takes an image as a file and the access token of the user.
If the user is an admin, updates the logo image in the assets folder with the new image.
Else, returns an error.

**Required Params:**

```
Logo File

Access Token
```
