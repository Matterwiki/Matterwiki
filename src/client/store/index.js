import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, {}, enhancer);
/* eslint-enable */

sagaMiddleware.run(sagas);

export default store;
