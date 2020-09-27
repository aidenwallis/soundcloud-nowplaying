import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {ApiService} from "../../services/api";
import * as userActions from "../../store/user/actions";
import {GlobalStore} from "../../types/models/store";

export const UserManager: React.FunctionComponent = () => {
  const hasToken = useSelector((state: GlobalStore) => state.user.hasToken);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleLogout = () => dispatch(userActions.resetStore());
    const _hasToken = hasToken;
    if (_hasToken) {
      ApiService.eventEmitter.on("logout", handleLogout);
      dispatch(userActions.getUser());
    }

    return () => {
      _hasToken && ApiService.eventEmitter.off("logout", handleLogout);
    };
  }, [dispatch, hasToken]);

  return null;
};
