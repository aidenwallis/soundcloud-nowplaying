import * as React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {GlobalStore} from "../../../../types/models/store";
import {HomeComponent} from "./component";

export const Home: React.FunctionComponent = () => {
  const hasToken = useSelector((state: GlobalStore) => state.user.hasToken);

  if (hasToken) {
    return <Redirect to="/dashboard" />;
  }

  return <HomeComponent />;
};
