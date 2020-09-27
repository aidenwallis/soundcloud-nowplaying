import * as React from "react";
import {useSelector} from "react-redux";
import {GlobalStore} from "../../../../types/models/store";
import {DashboardToolbarUserComponent} from "./component";

export const DashboardToolbarUser: React.FunctionComponent = () => {
  const user = useSelector((state: GlobalStore) => state.user.user);
  if (!user) {
    return null;
  }

  return <DashboardToolbarUserComponent user={user} />;
};
