import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {GlobalStore} from "../types/models/store";

export type AsyncAction = ThunkAction<
  void,
  GlobalStore,
  unknown,
  Action<string>
>;
