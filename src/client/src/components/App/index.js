import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./reset.scss";
import "./style.scss";

import AdminRoute from "../Common/AdminRoute";
import Header from "../Layout/Header";
import Public from "../Pages/Public";
import Admin from "../Pages/Admin";
import CardUpdate from "../Control/CardUpdate";

function App() {
  return (
    <Router>
      <div className="app">
        {/* header  */}
        <Header />
        <Switch>
          <Route exact path="/" component={Public} />
          <AdminRoute exact path="/admin" component={Admin} />
          <AdminRoute path="/card-update/:id" component={CardUpdate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;