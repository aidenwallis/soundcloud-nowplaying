import * as React from "react";
import {useSelector} from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import {parseUrlParams} from "../../../../helpers/parse-url-params";
import {GlobalStore} from "../../../../types/models/store";
import {HomeComponent} from "./component";

export const Home: React.FunctionComponent = () => {
  const hasToken = useSelector((state: GlobalStore) => state.user.hasToken);
  const location = useLocation();

  if (hasToken) {
    return <Redirect to="/dashboard" />;
  }

  const queryParams = parseUrlParams(location.search.substring(1));

  return <HomeComponent redirectURL={queryParams.next || ""} />;
};
