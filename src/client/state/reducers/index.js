import { combineReducers } from "redux";
import articles from "./article";
import topics from "./topic";
import users from "./user";

const rootReducer = combineReducers({
  articles,
  topics,
  users
});

export default rootReducer;
