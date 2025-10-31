import { combineReducers } from "redux";
import modal from "./modules/modalSlice";
import todoSlice from "./modules/todoSlice";

export const RootReducer = combineReducers({
  modal,
  todoSlice,
});
