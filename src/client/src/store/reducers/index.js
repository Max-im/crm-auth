import { combineReducers } from "redux";
import auth from "./auth";
import data from "./data";
import analyst from "./analyst";

export default combineReducers({ auth, data, analyst });
