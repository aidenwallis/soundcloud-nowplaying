import * as React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {GlobalStore} from "../../../../../../types/models/store";
import {OverlaysModal} from "../overlays-modal";

export const OverlaysView: React.FunctionComponent = () => {
  const overlays = useSelector((state: GlobalStore) => state.overlays.overlays);
  const params = useParams<{overlayId: string}>();
  if (!params.overlayId) {
    return null;
  }

  const overlay = overlays.find((o) => o.id === params.overlayId);
  if (!overlay) {
    return null;
  }

  return <OverlaysModal overlay={overlay} />;
};
