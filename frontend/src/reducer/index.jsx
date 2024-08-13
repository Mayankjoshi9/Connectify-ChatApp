
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import chatReducer from "../slices/chat";
import messageReducer from "../slices/message"

const rootReducer= combineReducers({
    auth:authReducer,
    chat:chatReducer,
    message:messageReducer,
})

export default rootReducer;