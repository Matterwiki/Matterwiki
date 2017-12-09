import { combineReducers } from "redux";
import articles from "./article";
import topics from "./topic";
import users from "./user";
import archives from "./archive";
import app from "./app";

const rootReducer = combineReducers({
  articles,
  topics,
  users,
  archives,
  app
});

export default rootReducer;
