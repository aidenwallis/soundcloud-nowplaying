import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as userActions from "../../store/user/actions";
import {GlobalStore} from "../../types/models/store";

export const UserManager: React.FunctionComponent = () => {
  const hasToken = useSelector((state: GlobalStore) => state.user.hasToken);
  const dispatch = useDispatch();

  React.useEffect(() => {
    hasToken && dispatch(userActions.getUser());
  }, [dispatch, hasToken]);

  return null;
};
