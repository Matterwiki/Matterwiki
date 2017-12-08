import { combineReducers } from "redux";
import articles from "./article";
import topics from "./topic";
import users from "./user";
import archives from "./archive";

const rootReducer = combineReducers({
  articles,
  topics,
  users,
  archives
});

export default rootReducer;
