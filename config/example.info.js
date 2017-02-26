"use strict";

// todo: add multiple twitter app keys to rotate
module.exports = {
  oauthCallbackUrl : "http://localhost:3001/oauth",
  MONGODB_URI : "mongodb://localhost:27017/personalities",
  REDIS_URI: "redis://localhost:6379",
  twitterCredentials : [
      {
        consumer_key : "9euBP7DiTrWo9eNxf1Hl5HRFE",
        consumer_secret : "CuU8AnRbNddhtNjPc63QnlgQqI1xYKyB2zQaVUk9DQKJbGFEwC",
        access_token_key : "",
        access_token_secret : "",
        enabled : true
      }
    ]
}