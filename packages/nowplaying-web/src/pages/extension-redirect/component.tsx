import {CircularProgress, makeStyles} from "@material-ui/core";
import * as React from "react";
import {Redirect, useLocation} from "react-router-dom";
import {parseUrlParams} from "../../helpers/parse-url-params";
import {TokenManager} from "../../util/token-manager";

const useStyles = makeStyles(() => ({
  container: {
    width: "100vw",
    height: "100vh",
    left: 0,
    top: 0,
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const ExtensionRedirectComponent: React.FunctionComponent = () => {
  const classes = useStyles();
  const location = useLocation();
  console.log(location);
  const queryParams = parseUrlParams(location.search.substring(1));
  console.log(queryParams);
  if (!queryParams.return) {
    return <Redirect to="/" />;
  }

  const args = [
    `accessToken=${encodeURIComponent(TokenManager.getAccessToken() || "")}`,
    `refreshToken=${encodeURIComponent(TokenManager.getRefreshToken() || "")}`,
  ].join("&");
  window.location.href = queryParams.return + "#" + args;

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
};
