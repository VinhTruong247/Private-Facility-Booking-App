import authReducer from "./slices/authSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  auth: authReducer,
});
