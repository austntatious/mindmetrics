// This component is directed to after Twitter authentication. It is opened in a new window, and 
// it begins to fetch the user's data after receiving accessTokens. On success, this window will close



import React, { Component } from 'react';

export default class Oauth extends Component {

  parentWindowRequest = () => {
    // CLOSE THIS WINDOW AFTER RECEIVING VERIFIED REQUEST TOKEN AND PASSING IT TO PARENT WINDOW
    // PARENT WINDOW THEN COMPLETES FLOW WITH VERFIED TOKEN AND RECEIVES ACCESS TOKEN
    // TAKES ACCESS TOKEN AND CRAWLS TWITTER FEED
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");

    const httpOptions = {
      method: "POST",
      headers: fetchHeaders,
      mode: "cors"
    };

    const fetchReq = new Request("/data", httpOptions);
    window.opener.fetch(fetchReq, httpOptions)
      .then(function(response) {
        response.json().then(function(data) {
          console.log(data);
        }, function(err) {
          console.log(err);
        })
      });
  };

  componentWillMount() {
    this.parentWindowRequest();
  };

    render() {
        return (
            null
        );
    }
}