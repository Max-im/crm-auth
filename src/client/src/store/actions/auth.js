import axios from "axios";
import { SET_USER } from "./constants";

export const onLogin = response => dispatch => {
  const { googleId: gId, email, name, imageUrl: avatar } = response.profileObj;
  axios
    .post("/auth", { gId, email, name, avatar })
    .then(({ data }) => dispatch({ type: SET_USER, payload: data }))
    .catch(err => console.error(err));
};

export const onLogOut = () => dispatch => {};

export const onLogError = error => dispatch => {
  console.error(error);
};
