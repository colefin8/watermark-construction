import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Landing from "./Components/Landing";
import Admin from "./Components/Admin";
import Nav from "./Components/Nav";

export default (
  <>
    <Nav />
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/admin" component={Admin} />
      <Route
        render={() => (
          <>
            <h1>404 page not found</h1>
            <Link to="/">Return to Home</Link>
          </>
        )}
      />
    </Switch>
  </>
);
