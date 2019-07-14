import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./reset.scss";
import "./style.scss";

import AdminRoute from "../Common/AdminRoute";
import AnalystRoute from "../Common/AnalystRoute";
import Header from "../Layout/Header";
import Public from "../Pages/Public";
import Admin from "../Pages/Admin";
import Analyst from "../Pages/Analyst";
import CardUpdate from "../Control/CardUpdate";

function App() {
  return (
    <Router>
      <div className="app">
        {/* header  */}
        <Header />
        <Switch>
          <Route exact path="/" component={Public} />
          <Route
            exact
            path="/admin"
            render={() => <Redirect to="/admin/1" />}
          />

          <AdminRoute path="/admin/:id" component={Admin} />
          <AdminRoute path="/card-update/:id" component={CardUpdate} />

          <Route
            exact
            path="/analyst"
            render={() => <Redirect to="/analyst/1" />}
          />
          <AnalystRoute path="/analyst/:id" component={Analyst} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
