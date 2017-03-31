import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Home from "./components/Home";
import App from "./App";
import { render } from "react-dom";
import React from "react";
import Form from "./components/Form";
import Results from "./components/results";
import Oauth from "./components/Oauth";
import injectTapEventPlugin from 'react-tap-event-plugin';


// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin

injectTapEventPlugin();
// TO DO: add uuid to new results page so that users can save the page itself(?)

render(
    <Router history = { browserHistory }>
        <Route                      component={App}>
            <Route path="/"         component={Home} />
            <Route path="/form"     component={Form} />
            <Route path="/results/:id"  component={Results} />
            <Route path="/oauth"    component={Oauth} />
        </Route>
    </Router>, document.getElementById("app-container")
);
