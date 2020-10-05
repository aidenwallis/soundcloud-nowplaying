import {OverlaysStore} from "../../store/overlays/reducer";
import {UserStore} from "../../store/user/reducer";

export interface GlobalStore {
  overlays: OverlaysStore;
  user: UserStore;
}
