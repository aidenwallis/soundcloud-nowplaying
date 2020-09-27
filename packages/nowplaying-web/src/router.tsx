import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {Dashboard} from "./pages/dashboard";
import {Home} from "./pages/home";

export const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};
