'use strict';

var Promise = require('bluebird');

function resolver(resolve, reject) {
  return function (error, result) {
    return error ? reject(error) : resolve(result);
  };
}

module.exports = function (f) {
  return new Promise(function (resolve, reject) {
    return f(resolver(resolve, reject));
  });
};