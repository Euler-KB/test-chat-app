import { combineReducers } from "redux";
import usersReducer from "./users";
import messagesReducer from "./messages";
import currentUserReducer from "./user";

export default combineReducers({
    user: currentUserReducer,
    users: usersReducer,
    messages: messagesReducer
});