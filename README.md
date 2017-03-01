# MindMetrics
> Single page application that takes user data and displays a detailed personality analysis.

## Install

Clone repository and run:

```sh
$ npm install
```

## Requirements

**NOTE:** Make sure you both have Mongo & Redis installed locally AND have it running, otherwise the project won't start properly.

- node v6+ & npm v3+
- MongoDB v3.2.10

#### Installation Guide for Node & NPM
https://nodejs.org/en/download/

#### Installation Guide for MongoDB
https://docs.mongodb.com/manual/installation/#tutorials



## Quickstart

All configuration options and connection URIs are located in `./config`. When getting errors, be sure to check that your connection URI is correct. Also, remember to copy example.info.js in `./config` and create a separate `info.js` file with your actual conneciton URIs and token secrets. 

#### Development
To run the project in development:

```sh
$ npm start
```

Go to [http://localhost:3001](http://localhost:3001) to see the magic happen.

#### Production

If you want to run the project in production, set the `NODE_ENV` environment variable to `production`. 

```sh
$ NODE_ENV=production npm start
```

Also build the production bundle:

```sh
$ npm run dist
```

## Tests

```sh
$ npm test
```

Only run specific tests

```sh
$ npm test -- NotFoundComponent
```

Coverage

```sh
$ npm test -- --coverage
```

## License
No license yet
