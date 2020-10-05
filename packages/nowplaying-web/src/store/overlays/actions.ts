import {ApiService} from "../../services/api";
import {Overlay} from "../../types/models/overlay";
import {RequestError} from "../../util/request-error";
import {AsyncAction} from "../stores";
import {Action} from "../types";

export enum OverlaysActionType {
  SetLoading = "overlays/set-loading",
  SetSubmitting = "overlays/set-submitting",
  SetError = "overlays/set-error",
  SetOverlays = "overlays/set-overlays",
}

type SetLoadingAction = Action<typeof OverlaysActionType.SetLoading, boolean>;
type SetSubmittingAction = Action<
  typeof OverlaysActionType.SetSubmitting,
  boolean
>;
type SetErrorAction = Action<typeof OverlaysActionType.SetError, string>;
type SetOverlaysAction = Action<
  typeof OverlaysActionType.SetOverlays,
  Overlay[]
>;

export type OverlaysStoreActions =
  | SetLoadingAction
  | SetErrorAction
  | SetOverlaysAction
  | SetSubmittingAction;

const setError = (error: string): SetErrorAction => ({
  type: OverlaysActionType.SetError,
  payload: error,
});

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: OverlaysActionType.SetLoading,
  payload: loading,
});

const setSubmitting = (submitting: boolean): SetSubmittingAction => ({
  type: OverlaysActionType.SetSubmitting,
  payload: submitting,
});

const setOverlays = (overlays: Overlay[]): SetOverlaysAction => ({
  type: OverlaysActionType.SetOverlays,
  payload: overlays,
});

export const getOverlays = (): AsyncAction => (dispatch) => {
  dispatch(setError(""));
  dispatch(setLoading(true));
  dispatch(setOverlays([]));
  ApiService.getOverlays()
    .then((overlays) => dispatch(setOverlays(overlays)))
    .catch((error: RequestError) => dispatch(setError(error.toString())))
    .finally(() => dispatch(setLoading(false)));
};

export const createOverlay = (name: string, done: () => void): AsyncAction => (
  dispatch,
) => {
  dispatch(setSubmitting(true));
  dispatch(setError(""));
  ApiService.createOverlay(name)
    .then(() => {
      dispatch(getOverlays());
      done();
    })
    .catch((error: RequestError) => dispatch(setError(error.toString())))
    .finally(() => dispatch(setSubmitting(false)));
};

export const deleteOverlay = (id: string, done: () => void): AsyncAction => (
  dispatch,
) => {
  dispatch(setSubmitting(true));
  dispatch(setError(""));
  ApiService.deleteOverlay(id)
    .then(() => {
      dispatch(getOverlays());
      done();
    })
    .catch((error: RequestError) => dispatch(setError(error.toString())))
    .finally(() => dispatch(setSubmitting(false)));
};
