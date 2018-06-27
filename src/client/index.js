import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import NotificationsWrapper from "components/Notifications/NotificationsWrapper";

// For `Promise`, Array.from and other fun stuff
// TODO replace this with core-js and use the stuff you just need
import "babel-polyfill";

import store from "store";

import Main from "./scenes/Main/Main";
import OAuth from "./scenes/OAuth/OAuth";

render(
  <Provider store={store}>
    <React.Fragment>
      <NotificationsWrapper />
      <Router>
        <Switch>
          <Route path="/oauth/login" component={OAuth} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </React.Fragment>
  </Provider>,
  document.getElementById("app")
);

// TODO react HMR
