import * as React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {GlobalStore} from "../../types/models/store";

interface Props {
  children: React.ReactNode;
}

export const AuthGuard: React.FunctionComponent<Props> = (props: Props) => {
  const hasToken = useSelector((state: GlobalStore) => state.user.hasToken);
  const hasUser = useSelector((state: GlobalStore) => !!state.user.user);

  if (!hasToken) {
    return (
      <Redirect to={`/?next=${encodeURIComponent(window.location.href)}`} />
    );
  }

  if (!hasUser) {
    return null;
  }

  return <>{props.children}</>;
};
