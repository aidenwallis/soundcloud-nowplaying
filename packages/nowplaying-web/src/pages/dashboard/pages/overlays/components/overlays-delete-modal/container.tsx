import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import * as overlaysActions from "../../../../../../store/overlays/actions";
import {GlobalStore} from "../../../../../../types/models/store";
import {OverlaysDeleteModalComponent} from "./component";

export const OverlaysDeleteModal: React.FunctionComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: GlobalStore) => ({
    error: state.overlays.error,
    loading: state.overlays.submitting,
    overlays: state.overlays.overlays,
  }));
  const params = useParams<{overlayId: string}>();

  if (!params.overlayId) {
    return null;
  }

  const overlay = state.overlays.find((o) => o.id === params.overlayId);
  if (!overlay) {
    return null;
  }

  const handleClose = () => history.push("/dashboard/overlays");

  const handleDelete = () => {
    dispatch(overlaysActions.deleteOverlay(overlay.id, handleClose));
  };

  return (
    <OverlaysDeleteModalComponent
      error={state.error}
      loading={state.loading}
      overlay={overlay}
      onClose={handleClose}
      onDelete={handleDelete}
    />
  );
};
