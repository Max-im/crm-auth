import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { read_cookie, delete_cookie } from "sfcookies";
import { setAuthToken } from "./store/actions/utils";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { SET_USER } from "./store/actions/constants";

try {
  const access_token = read_cookie("crm");
  const decoded = jwt_decode(access_token);
  if (decoded && decoded.exp) {
    if (decoded.exp * 1000 < Date.now()) {
      delete_cookie("crm");
      store.dispatch({ type: SET_USER, payload: {} });
    }
    store.dispatch({ type: SET_USER, payload: decoded.user });
    setAuthToken(access_token);
  }
} catch (err) {
  // show auth error
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
