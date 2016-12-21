var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;

var env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
  build: (env.production || env.staging)
});

module.exports = {
  target: 'web',
  entry: [
    'babel-polyfill',
    './client/Router.jsx'
  ],

  output: {
    path: path.join(process.cwd(), '/client'),
    pathInfo: true,
    publicPath: 'http://localhost:3000/client/',
    filename: 'main.js'
  },

  resolve: {
    alias: { 
      'react/lib/ReactMount': 'react-dom/lib/ReactMount' 
    },
    root: path.join(__dirname, ''),
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.css', '.woff', '.svg', '.woff2', '.tff', '.eot', '.less']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    new ExtractTextPlugin("main.css")
  ],

  module: {
    // add CSS loader
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      { test: /\.less$/,   loader: "style!css!less" },
      { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
      loader: "url?limit=100000&name=[name].[ext]"
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets:['react', 'es2015', 'stage-1']
        }
      },
      { test: /\.json$/, loader: 'json' }
    ]
  }
};
