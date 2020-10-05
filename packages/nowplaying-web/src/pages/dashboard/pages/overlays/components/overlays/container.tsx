import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as overlaysActions from "../../../../../../store/overlays/actions";
import {GlobalStore} from "../../../../../../types/models/store";
import {DashboardOverlaysComponent} from "./component";

export const DashboardOverlays: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: GlobalStore) => ({
    loading: state.overlays.loading,
    error: state.overlays.error,
    overlays: state.overlays.overlays,
  }));

  React.useEffect(() => {
    dispatch(overlaysActions.getOverlays());
  }, [dispatch]);

  return (
    <DashboardOverlaysComponent
      loading={state.loading}
      error={state.error}
      overlays={state.overlays}
    />
  );
};
