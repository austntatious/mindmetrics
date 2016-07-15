# MindMetrics
> Single page application that takes user data and displays a detailed personality analysis.

## Install

Clone repository and run:

```sh
$ npm install
```

## Requirements

node 5+
MongoDB

**NOTE:** Make sure you both have Mongo installed locally AND have it running, otherwise the project won't start properly.

## Development

```sh
$ npm start
```

Go to [http://localhost:3001](http://localhost:3001) and see the magic happen.

## Production

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
