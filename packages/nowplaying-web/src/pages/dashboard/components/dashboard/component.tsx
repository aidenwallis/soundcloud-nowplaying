import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {DashboardPage} from "../../pages/dashboard";
import {DashboardGuard} from "../dashboard-guard";
import {DashboardLayout} from "../dashboard-layout";

export const Dashboard: React.FunctionComponent = () => {
  return (
    <DashboardLayout>
      <DashboardGuard>
        <Switch>
          <Route exact path="/dashboard" component={DashboardPage} />
        </Switch>
      </DashboardGuard>
    </DashboardLayout>
  );
};
