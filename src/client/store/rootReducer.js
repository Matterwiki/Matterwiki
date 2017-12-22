import { combineReducers } from "redux";
import articles from "./modules/article";
import topics from "./modules/topic";
import users from "./modules/user";
import archives from "./modules/archive";
import app from "./modules/app";
import search from "./modules/search";

const rootReducer = combineReducers({
  articles,
  topics,
  users,
  archives,
  search,
  app
});

export default rootReducer;
