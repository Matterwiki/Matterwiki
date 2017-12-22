import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

// For `Promise`, Array.from and other fun stuff
// TODO replace this with core-js and use the stuff you just need
import "babel-polyfill";

import store from "store";

import Main from "./scenes/Main/Main";

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Main} />
    </Router>
  </Provider>,
  document.getElementById("app")
);

// TODO react HMR
