import { loginReducer, loginStatusReducer,bestAnswerUpdatedReducer } from "./auth";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  LoggedInUser: loginReducer,
  isLoggedIn: loginStatusReducer,
  bestAnswerUpdated: bestAnswerUpdatedReducer
});

export default rootReducer;
