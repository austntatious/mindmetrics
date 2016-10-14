import { Router, Route, IndexRoute, browserHistory } from "react-router"
import Home from "./components/Home"
import App from "./App"
import { render } from "react-dom"
import React from "react"
import FormContainer from "./components/FormContainer"
import LandingHeader from "./components/LandingHeader"
import Results from "./components/Results"
import StaticResults from "./components/StaticResults"
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

render(
    <Router history = { browserHistory }>
        <Route                      component={App}>
            <Route path="/"         component={Home} />
            <Route path="/form"     component={FormContainer} />
            <Route path="/user/:id" component={Results} />
            <Route path="/results"  component={StaticResults} />
        </Route>
    </Router>, document.getElementById("app-container")
);
