import axios from "axios";
import { bake_cookie, delete_cookie } from "sfcookies";
import { SET_USER } from "./constants";
import { setAuthToken } from "./utils";

/**
 * LOGIN
 * @param {Object} response from Google
 */
export const onLogin = response => dispatch => {
  const { googleId: gId, email, name, imageUrl: avatar } = response.profileObj;
  axios
    .post("/auth", { gId, email, name, avatar })
    .then(({ data }) => {
      dispatch({ type: SET_USER, payload: data });
      bake_cookie("crm", data);
      setAuthToken(data);
    })
    .catch(err => console.error(err.response.data));
};

/**
 * LOGOUT
 */
export const onLogOut = () => dispatch => {
  dispatch({ type: SET_USER, payload: {} });
  delete_cookie("crm");
  setAuthToken(false);
};

/**
 * LOGIN ERROR
 * @param {Object} error from Google
 */
export const onLogError = error => dispatch => {
  console.error(error);
};
