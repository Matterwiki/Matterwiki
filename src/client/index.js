import React from "react";
import { render } from "react-dom";
import { HashRouter, Route } from "react-router-dom";

// For `Promise`, Array.from and other fun stuff
// TODO replace this with core-js and use the stuff you just need
import "babel-polyfill";

import Main from "./scenes/Main/Main";

render(
  <HashRouter>
    <Route path="/" component={Main} />
  </HashRouter>,
  document.getElementById("app")
);

// TODO react HMR
