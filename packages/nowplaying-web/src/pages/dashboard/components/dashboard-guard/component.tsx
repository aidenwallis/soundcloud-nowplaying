import * as React from "react";
import {useSelector} from "react-redux";
import {GlobalStore} from "../../../../types/models/store";

interface Props {
  children: React.ReactNode;
}

export const DashboardGuard: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const hasUser = useSelector((state: GlobalStore) => !!state.user.user);
  if (!hasUser) {
    return null;
  }

  return <>{props.children}</>;
};
