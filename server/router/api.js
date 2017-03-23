"use strict";

const express = require("express");

// import user model
const User        = require("../models/User");
const router = express.Router();
const oauth       = require("oauth-libre/lib/oauth-promise").OAuth;
const config    = require("../../config/info");
const twitterCredentials = config.twitterCredentials;
const TwitterCrawler = require("twitter-crawler");
const pi_input = require('personality-insights-input');
const personality_insights = require("../../helpers/personality-insights");
// var profileFromTweets = personality_insights.profile_from_tweets;

// Extending router with api methods

/*
 STEP 1 - init the OAuth Client!
 */

 // TODO: how to send to router to use as global variable?
 // instantiate Oauth object in oauth route file, which will be mounted to main Router

let oa = new oauth(
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
      let oauthToken = data[0];
      let oauthTokenSecret = data[1];

      // Get the secret oauth request token and save to hash
      reqTokenSecrets[oauthToken] = oauthTokenSecret;
      console.log("inside requestTokenPromise resolver. reqTokenSecrets: ", reqTokenSecrets);

      // Redirect user to Twitter Auth
      let redirectURL = "https://api.twitter.com/oauth/authenticate"+"?oauth_token="+oauthToken;
      res.redirect(redirectURL);
      })
    .catch(function(err) {
      console.log("Error in Oauth requestTokenPromise: ", err);
    });
    console.log("end of Request Token function");
}

function twitterOauthAccessToken(req, res) {
  /**
   * Get the access token and access token secret, then process feed data
   */
  let accessTokenPromise = oa.getOAuthAccessToken(req.query.oauth_token,
                                                  reqTokenSecrets[req.query.oauth_token],
                                                  req.query.oauth_verifier);
  /*
    Similar to access token:
    data[0]: access token
    data[1]: access token secret
    data[2]: results

    Receives accessToken, verifies credentials, and then crawls Twitter feed
   */
  accessTokenPromise
    .then(function(data) {
      let accessToken = data[0];
      let accessTokenSecret = data[1];
      let results = data[2];
      // todo: add error handler!

      // on accessToken success, verify credentials
      let verifyCredentialsPromise = oa.get("https://api.twitter.com/1.1/account/verify_credentials.json",
                               accessToken,
                               accessTokenSecret);

      verifyCredentialsPromise
        .then(function(data) {

        let userData = JSON.parse(data[0]);
        console.log("credentials are correct:", userData);

        twitterCredentials[0].access_token_key = accessToken;
        twitterCredentials[0].access_token_secret = accessTokenSecret;
        console.log("Twitter Credentials: ", twitterCredentials);

        const crawler = new TwitterCrawler(twitterCredentials);
        let twitterHandle = userData.screen_name;
        console.log("twitter handle: ", twitterHandle);

        return crawler
          .getUser(twitterHandle)
          .then((user) => {
            console.log(
              "Obtained info for user " + user.name + " " + user.id
            );

          // Crawl tweets

          console.log("Obtaining tweets...");
          return crawler
            .getTweets({screen_name: twitterHandle, trim_user: true} , { limit : 300 })
            .then((tweets) => {
              console.log(
                "Obtained " + tweets.length + " tweets for user " + user.name + user.id
              );
              console.log("Tweet: ", tweets.slice(-1));
              console.log("Crawling finished.");

              let tweetWords = tweets.reduce(function(prev, currTweet) {
                function countWords(s) {
                  s = s.replace(/(^\s*)|(\s*$)/gi,""); //exclude  start and end white-space
                  s = s.replace(/[ ]{2,}/gi," ");      //2 or more space to 1
                  s = s.replace(/\n /,"\n");           // exclude newline with a start spacing
                  return s.split(' ').length; 
                }

                return countWords(currTweet.text) + prev;
              }, 0);

              const newUser = new User({
                  social_media: {
                      twitter: {
                          user_info: userData,
                          credentials: twitterCredentials,
                          crawled_tweets: tweets
                      }
                  }
              });

              return newUser.save()
                  .then(function(saved) {
                  console.log(
                      "Mongo saved new record! Id: ", saved._id, "Saved tweet text: ",
                      saved.social_media.twitter.crawled_tweets.slice(-1)[0].text
                      );

                  return {"id": saved._id, "wordCount": tweetWords};
                }).catch(function(err) {
                  console.log("Error saving mongo record: ", err);
                  return err;
                });

              // send new Mongo record data to client
            });
        }).catch(function(err) {
          console.log("Error in getting user: ", err);
          res.json(err);
        });

      }).then(function(data) {
        console.log("Finished twitter flow");
        res.json(data);

      }).catch(function(err) {
        // if credentials verification throws an error, it will be 401 status code and supplied user credentials are wrong
        console.log("Error in credentials verification:", err);
        res.json(err);
      });

  }).catch(function(err) {
    res.json(err);
    console.log("Error in accessTokenPromise:", err);
  });

}

// Final user post submission - contains email, name, and possibly form text   
function submitData(req, res) {
     
   // incoming request meta data   
   console.log("post submission received, req.body = ", req.body);   
   console.log("User-Agent: " + req.headers["user-agent"]);    
   console.log("IP with proxy method: ", req.headers["x-forwarded-for"]);     
   
   /**/  
   // inspect request data
   // user actions:
   // 1) adds twitter feed then clicks submit: use ID and add all new data to Mongo document
    // - queries mongo with current ID, if no ID found, return error
    // - if ID found, update document with new data and send formatted input to IBM API
    // - save IBM response to mongo & send to client

   // 2) doesn't add twitter and just submits with textInput 
   // check mongo for existing ID number
   // if no ID number, create new record
    // send formatted input to IBM API
    // save response to mongo & send to client
   /**/

   if(req.body.id) {
       User.findByIdAndUpdate(req.body.id, {
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           email: req.body.email,
           metadata: {
               browserInfo: req.headers["user-agent"],
               ip: req.headers["x-forwarded-for"]
           }
       }).then(function(updated) {
           console.log("Updated Mongo doc: ", updated);

           //
       }).catch(function(err) {
           console.log("error in updating mongo doc: ", err);
       });
   }

   let user = new User({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       metadata: {
           browserInfo: req.headers["user-agent"],
           ip: req.headers["x-forwarded-for"]
       }
   });
   // save doc
    // format input
    // send to IBM
    // save to mongo (async)
    //





   // add mock data.json as mock API response data   
   // const user = new User({   
   //   firstName : req.body.firstName,
   //   lastName: req.body.lastName,   
   //   uuid: uuid.v1(),    
   //   email : req.body.email,    
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
  res.json({"do": "something"});  
  console.log("End of submission route");

 }   

// route for all oauth requests and data submissions
router.get("/oauth", twitterOauthRequestToken);
router.post("/data", twitterOauthAccessToken);
router.post("/submit", submitData);


module.exports = router;
