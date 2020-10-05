import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import * as overlaysActions from "../../../../../../store/overlays/actions";
import {Overlay} from "../../../../../../types/models/overlay";
import {GlobalStore} from "../../../../../../types/models/store";
import {OverlaysModalComponent} from "./component";

interface Props {
  overlay?: Overlay;
}

export const OverlaysModal: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state: GlobalStore) => ({
    loading: state.overlays.submitting,
    error: state.overlays.error,
  }));

  const handleClose = () => history.push("/dashboard/overlays");

  const handleCreate = (name: string) => {
    dispatch(overlaysActions.createOverlay(name, handleClose));
  };

  return (
    <OverlaysModalComponent
      loading={state.loading}
      error={state.error}
      overlay={props.overlay}
      onCreate={handleCreate}
      onClose={handleClose}
    />
  );
};
