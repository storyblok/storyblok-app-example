# Example sidebar app for Storyblok

This repository shows an example sidebar app with oauth2 authentication.

It uses an express server to handle the authentication. Please check the file `server.js` and `routes.js`.

## Requirements

You need to create a ssl tunnel to test the app as Storyblok requires https.

A nice tool to start such a tunnel is [ngrok](https://ngrok.com/).

## Setup

Rename the file .env.example to .env and define CONFIDENTIAL_CLIENT_ID, CONFIDENTIAL_CLIENT_SECRET (from the app settings in Storyblok) and CONFIDENTIAL_CLIENT_REDIRECT_URI (from the ngrok tunnel).

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

