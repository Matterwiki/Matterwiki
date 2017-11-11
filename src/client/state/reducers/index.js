import { combineReducers } from "redux";
import articles from "./article";
import topics from "./topic";

const rootReducer = combineReducers({
  articles,
  topics
});

export default rootReducer;
