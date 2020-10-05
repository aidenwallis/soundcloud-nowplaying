import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {AuthGuard} from "../../../../components/auth-guard";
import {DashboardPage} from "../../pages/dashboard";
import {DashboardOverlays} from "../../pages/overlays";
import {DashboardLayout} from "../dashboard-layout";

export const Dashboard: React.FunctionComponent = () => {
  return (
    <DashboardLayout>
      <AuthGuard>
        <Switch>
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route path="/dashboard/overlays" component={DashboardOverlays} />
        </Switch>
      </AuthGuard>
    </DashboardLayout>
  );
};
