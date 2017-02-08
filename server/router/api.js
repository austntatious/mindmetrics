"use strict";

const express = require("express");
const router = express.Router();
const oauth       = require("oauth-libre/lib/oauth-promise").OAuth;
// todo: change relative paths to absolute paths
const config    = require("../../config/info");
const twitterCredentials = config.twitterCredentials;
const TwitterCrawler = require("twitter-crawler");
const pi_input = require('personality-insights-input');
// import Redis obj from index
const redisClient = require("../../index");
const redis       = require("redis");
const personality_insights = require("../../helpers/personality-insights");
// var profileFromTweets = personality_insights.profile_from_tweets;

// Extending router with api methods

/*
 STEP 1 - init the OAuth Client!
 */

 // TODO: how to send to router to use as global variable?
 // instantiate Oauth object in oauth route file, which will be mounted to main Router

var oa = new oauth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  twitterCredentials[0].consumer_key,            // CONSUMER KEY
  twitterCredentials[0].consumer_secret,         // CONSUMER SECRET
  "1.0",
  config.oauthCallbackUrl,
  "HMAC-SHA1"
);

var reqTokenSecrets = {}; // Hash that contains the req_token:req_token_secret key vals

function twitterOauthRequestToken(req, res, next) {
  // prevent users from directing to this route - only allow app to direct here
  // also limit IPs 

  // if query has oauth_token, this is callback req from Twitter - render oauth component through wildcard route
  if (req.query.oauth_token) {
    console.log("inside if oauth token");
    return next("route");
  }

   // STEP 2: Ask twitter for a signed request token

  // oAuthToken/Secret used for this this handshake process
  var requestTokenPromise = oa.getOAuthRequestToken();

  /*
    Promise returns data array in the format:
    data[0]: oauth_token
    data[1]: oauth_token_secret
    data[2]: results
   */
  requestTokenPromise
    .then(function(data){
      // Extract data
      var oauthToken = data[0];
      var oauthTokenSecret = data[1];

      // Get the secret oauth request token and save to hash
      reqTokenSecrets[oauthToken] = oauthTokenSecret;
      console.log("inside requestTokenPromise resolver. reqTokenSecrets: ", reqTokenSecrets);

      // Redirect user to Twitter Auth
      var redirectURL = "https://api.twitter.com/oauth/authenticate"+"?oauth_token="+oauthToken;
      res.redirect(redirectURL);
      })
    .catch(function(err) {
      console.log("Error in Oauth requestTokenPromise: ", err);
    });
    console.log("end of Request Token function");
}

function twitterOauthAccessToken(req, res, next) {
  /**
   * Get the access token and access token secret, then process feed data
   */
  var accessTokenPromise = oa.getOAuthAccessToken(req.query.oauth_token,
                                                  reqTokenSecrets[req.query.oauth_token],
                                                  req.query.oauth_verifier);
  /*
    Similar to access token:
    data[0]: access token
    data[1]: access token secret
    data[2]: results

    Receives accessToken, verfies credentials, and then crawls Twitter feed
   */
  accessTokenPromise
    .then(function(data) {
      var accessToken = data[0];
      var accessTokenSecret = data[1];
      var results = data[2];
      // add error handler!

      // on accessToken success, verify credentials
      var verifyCredentialsPromise = oa.get("https://api.twitter.com/1.1/account/verify_credentials.json",
                               accessToken,
                               accessTokenSecret);

      verifyCredentialsPromise
        .then(function(data) {

        var userData = JSON.parse(data[0])
        console.log("credentials are correct:", userData);

        twitterCredentials[0].access_token_key = accessToken;
        twitterCredentials[0].access_token_secret = accessTokenSecret;
        console.log("Twitter Credentials: ", twitterCredentials);

        const crawler = new TwitterCrawler(twitterCredentials);
        var twitterHandle = userData.screen_name; 
        console.log("twitterHandle: ", twitterHandle);

        return crawler
          .getUser(twitterHandle)
          .then((user) => {
            console.log(
              "Obtained info for user " + user.name + user.id
            );

          // Crawl tweets
          // Todo: implement this recursively to get entire user timeline; we know total tweet count from credentials verification
          console.log("Obtaining tweets...");
          return crawler
            .getTweets(twitterHandle, { min_tweets: 50, limit : 300 })
            .then((tweets) => {
              console.log(
                "Obtained " + tweets.length + " tweets for user " + user.name + user.id
              );
              console.log("Tweet: ", tweets.slice(-1));
              console.log("Crawling finished.");

              // save tweets in original form(?)

              var tweetWords = tweets.reduce(function(prev, currTweet) {
                function countWords(s){
                  s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
                  s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
                  s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
                  return s.split(' ').length; 
                }

                var totalWords = countWords(currTweet.text) + prev;
                return totalWords;
              }, 0);
  
              // todo: format tweets async
              var tweetsFormatted = JSON.stringify(tweets);

              // send formatted input to redis as string and generate token to associate to user session - do this async!!!
              var uuid = Math.floor(Math.random() * 1000000);
              redisClient.hset(uuid, "tweets", tweetsFormatted, redis.print);

              // change this to promise
              redisClient.hgetall(uuid, function (err, obj) {
                console.dir("Saved redis hash:", obj.tweets);
              });
              
              // store string to user's hash. each keyvalue pair corresponds to a different data input - text input, twitter, fb, etc

              // finally, send wordcount to user & userToken to associate redis session 
              return {"uuid": uuid, "wordCount": tweetWords};
            });
        }).catch(function(err) {
          console.log("Error in getting user: ", err);
        });


      }).then(function(data) {
        // send success response to client with word count & redis token
        console.log("Finished twitter flow");
        res.json(data);

      }).catch(function(err) {
        // if credentials verification throws an error, it will be 401 status code and supplied user credentials are wrong
        console.log("Error in credentials verification:", err);
      });

  }).catch(function(err) {
    console.log("Error in accessTokenPromise:", err);
  });

}

// Final user post submission - contains email, name, and possibly form text   
function submitData(req, res, next) {    
     
   // incoming request meta data   
   console.log("post submission received, req.body = ", req.body);   
   console.log("User-Agent: " + req.headers["user-agent"]);    
   console.log("IP: ", req.connection.remoteAddress);    
   console.log("IP with proxy method: ", req.headers["x-forwarded-for"]);    
   console.log("req.headers: ", req.headers);    
   
   /**/  
   // check redis cache for existing uploaded data associated with session / user    
   // if found, append data to current text input and send to IBM
   // submit Req will have email, name, and possibly form text data    
   // display error responses to user    
   // send success response to client, flush cache associated with user, and save response to mongo    
   /**/


   // add mock data.json as mock API response data   
   // const user = new User({   
   //   name : req.body.name,   
   //   uuid: uuid.v1(),    
   //   email : req.body.email,   
   //   birthyear: req.body.birthyear,    
   //   gender : req.body.gender,   
   //   textInput : req.body.textInput,   
   //   browserInfo: req.headers["user-agent"],   
   // });   
     
   // Personality Insights API needs JSON input unless otherwise specified   
   // getProfile(user)
   // .then(function(results) {    
   //   res.json(results);   
   //   user.watsonData = results;   
   // user.save().then(function(saved) {    
   //   res.json(saved); // delete this after testing   
   //   console.log("Saved new user data:", saved);   
   // }, function(err) {    
   //   res.json(err);    
   //   console.log("Error saving new user:", err);   
   // });   
   // }, function(err) {   
   //   console.log("error from getProfile", err);   
   //   res.json("ERROR:", err);   
   // });    
   // ADD ERROR HANDLING   
   console.log("End of submission route");

 }   

// route for all oauth requests and data submissions
router.get("/oauth", twitterOauthRequestToken);
router.post("/data", twitterOauthAccessToken);
router.post("/submit", submitData);


module.exports = router;
