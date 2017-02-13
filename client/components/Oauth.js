import React, { Component } from 'react';

// this component is the final step of Twitter Oauth
// it is meant to opened in a child window
// It takes the oauth_token from the URL string received from Twitter and sends a POST with token from parent window

export default class Oauth extends Component {


  closeWindow = () => {
    window.close();
  };

  componentWillMount() {
    /**
     * Get the value of a querystring
     * @param  {String} field The field to get the value of
     * @param  {String} url   The URL to get the value from (optional)
     * @return {String}       The field value
     */

    // todo: change this based on which social feed we're calling
    var source = "twitter";
    var getQueryString = function ( field, url ) {
        var href = url ? url : window.location.href;
        var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

    var oauthToken = getQueryString("oauth_token");
    var oauthVerifier = getQueryString("oauth_verifier");
    // pass verifier tokens into this post request, which is sent from Parent window
    window.onunload = function (e) {
      opener.sendPost(oauthToken, oauthVerifier, source);
    };

    // then close window
    this.closeWindow();
  };

    render() {
        return (
            null
        );
    }
}