import { Router, Route, IndexRoute, browserHistory } from "react-router"
import Home from "./components/Home"
import App from "./App"
import { render } from "react-dom"
import React from "react"
import FormContainer from "./components/FormContainer"
import LandingHeader from "./components/LandingHeader"
import Results from "./components/Results"
import FormUserTextInput from "./components/FormUserTextInput"
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin

// TO DO: add uuid to new results page so that users can save the page itself(?)
injectTapEventPlugin();

render(
    <Router history = { browserHistory }>
        <Route                      component={App}>
            <Route path="/"         component={Home} />
            <Route path="/form"     component={FormContainer} />
            <Route path="/form/input"  component={FormUserTextInput} />
            <Route path="/results"  component={Results} />
        </Route>
    </Router>, document.getElementById("app-container")
);
