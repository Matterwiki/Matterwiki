import { combineReducers } from "redux";
import articles from "./modules/article";
import topics from "./modules/topic";
import users from "./modules/user";
import archives from "./modules/archive";
import app from "./modules/app";

const rootReducer = combineReducers({
  articles,
  topics,
  users,
  archives,
  app
});

export default rootReducer;
