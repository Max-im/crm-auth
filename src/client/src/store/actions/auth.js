import axios from "axios";
import { bake_cookie, delete_cookie } from "sfcookies";
import jwt_decode from "jwt-decode";
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
      const { access_token } = data;
      setAuthToken(access_token);
      bake_cookie("crm", access_token);

      // decode token
      const decoded = jwt_decode(access_token);
      dispatch({ type: SET_USER, payload: decoded.user });
    })
    .catch(err => console.error(err.response.data));
};

/**
 * LOGOUT
 */
export const onLogOut = () => dispatch => {
  axios
    .get("/auth")
    .then(() => {
      dispatch({ type: SET_USER, payload: {} });
      delete_cookie("crm");
      setAuthToken(false);
    })
    .catch(err => console.error(err.response.data));
};

/**
 * LOGIN ERROR
 * @param {Object} error from Google
 */
export const onLogError = error => dispatch => {
  console.error(error);
};
