import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { read_cookie, delete_cookie } from "sfcookies";
import { setAuthToken } from "./store/actions/utils";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { SET_USER } from "./store/actions/constants";

const userCookie = read_cookie("crm");
if (Object.keys(userCookie).length > 0) {
  store.dispatch({ type: SET_USER, payload: userCookie });
  setAuthToken(userCookie);
  // TODO - check expired date
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
