import React from "react";
import { Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import Login from "./Login/Login";
import Setup from "./Setup/SetupContainer";

import "./App.css";

const App = () => (
  <div>
    <Switch>
      <Route path="/setup" component={Setup} />
      <Route path="/login" component={Login} />
    </Switch>
  </div>
);

export default App;
