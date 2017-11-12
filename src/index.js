import React from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  routerReducer,
  routerMiddleware,
  ConnectedRouter
} from "react-router-redux";
import createHistory from "history/createBrowserHistory";

// NOTE: Needed for generators and stuff
import "babel-polyfill";

import App from "./ui/views/App";

import reducers from "./state/reducers/reducers";
import rootSaga from "./state/sagas/rootSaga";

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const RRMiddleware = routerMiddleware(history);

const store = createStore(
  combineReducers({ ...reducers, router: routerReducer }),
  applyMiddleware(RRMiddleware, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

render(
  // TODO use BrowserRouter
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")
);

// TODO react HMR
