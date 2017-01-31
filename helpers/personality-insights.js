"use strict";

/**
* Methods to prepare user data for submission to IBM Personality Insights API
**/


var
  credentials = require('../credentials.json').personality_insights,
  watson      = require('watson-developer-cloud'),
  _           = require('underscore'),
  extend      = _.extend,
  to_promise  = require('../util/callback-to-promise'),
  pi_input    = require('personality-insights-input');


var
  personality_insights = watson.personality_insights(credentials),
  getProfile = function (parameters) {
    return to_promise(function(callback) {
      personality_insights.profile(sanitize(parameters), function(err,response) {
        var v3_credentials = extend(credentials, {version_date: "2016-10-19", version: "v3"});
        if (parameters.source_type === 'twitter') {
          const items = parameters.contentItems.map(function (item) {
            delete item['userid'];
            delete item['sourceid'];
            return item;
          });
          parameters.contentItems = items;
        }
        var v3_parameters = extend(parameters, {consumption_preferences: true});
        var personality_insights_v3 = new watson.PersonalityInsightsV3(v3_credentials);
        personality_insights_v3.profile(sanitize(v3_parameters), function(cperr, cpresponse) {
          if (!cperr && cpresponse) {
            if (response) {
              response.consumption_preferences = cpresponse.consumption_preferences;
            }
          } else {
            if (cperr) {
              console.log(cperr);
            }
            if (response) {
              response.consumption_preferences = [];
            }
          }
          if (response) {
            response.raw_v3_response = cpresponse;
          }
          callback(err, response)
        });
      });
    });
  };

var sanitize = function (parameters) {
  return extend(parameters, {
      text: parameters.text ? parameters.text.replace(/[\s]+/g, ' ') : undefined
    });
  };

var profileFromTweets = function (parameters) {
    return function (tweets) {
      return getProfile(extend(parameters, pi_input.fromTweets(tweets)));
    };
  };

module.exports = {
  profile : getProfile,
  profile_from_tweets : profileFromTweets,
};