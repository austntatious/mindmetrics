import { Router, Route, IndexRoute, browserHistory } from "react-router"
import App from "./components/App"
import { render } from "react-dom"
import React from "react"
import FormContainer from "./components/FormContainer"
import LandingHeader from "./components/LandingHeader"
import Results from "./components/Results"
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

render(
  <Router history = { browserHistory }>
    <Route path="/" component={App} />
    <Route path="/form" component={FormContainer} />
    <Route path="/results" component={Results} />
  </Router>, document.getElementById("app")
  );