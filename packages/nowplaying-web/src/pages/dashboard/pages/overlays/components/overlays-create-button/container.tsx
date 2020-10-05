import * as React from "react";
import {useSelector} from "react-redux";
import {GlobalStore} from "../../../../../../types/models/store";
import {OverlaysCreateButtonComponent} from "./component";

export const OverlaysCreateButton: React.FunctionComponent = () => {
  const overlays = useSelector((state: GlobalStore) => state.overlays.overlays);
  return <OverlaysCreateButtonComponent limitReached={overlays.length >= 10} />;
};
