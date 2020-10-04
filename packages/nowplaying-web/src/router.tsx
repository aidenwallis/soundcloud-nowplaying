import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {Dashboard} from "./pages/dashboard";
import {ExtensionRedirect} from "./pages/extension-redirect";
import {Home} from "./pages/home";

export const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/extension-redirect" component={ExtensionRedirect} />
    </Switch>
  );
};
