import {ApiService} from "../../services/api";
import {AuthenticatedUser} from "../../types/models/user";
import {RequestError} from "../../util/request-error";
import {AsyncAction} from "../stores";
import {Action, PlainAction} from "../types";

export enum UserActionType {
  SetLoading = "user/set-loading",
  SetError = "user/set-error",
  SetUser = "user/set-user",
  ResetStore = "user/reset-store",
}

type SetLoadingAction = Action<typeof UserActionType.SetLoading, boolean>;
type SetErrorAction = Action<typeof UserActionType.SetError, string>;
type SetUserAction = Action<
  typeof UserActionType.SetUser,
  AuthenticatedUser | null
>;
type ResetStoreAction = PlainAction<typeof UserActionType.ResetStore>;

export type UserStoreActions =
  | SetLoadingAction
  | SetErrorAction
  | SetUserAction
  | ResetStoreAction;

const setError = (error: string): SetErrorAction => ({
  type: UserActionType.SetError,
  payload: error,
});

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: UserActionType.SetLoading,
  payload: loading,
});

const setUser = (user: AuthenticatedUser | null): SetUserAction => ({
  type: UserActionType.SetUser,
  payload: user,
});

export const getUser = (): AsyncAction => (dispatch) => {
  dispatch(setError(""));
  dispatch(setLoading(true));
  dispatch(setUser(null));
  ApiService.getUser()
    .then((user: AuthenticatedUser) => dispatch(setUser(user)))
    .catch((error: RequestError) => dispatch(setError(error.toString())))
    .finally(() => dispatch(setLoading(false)));
};

export const resetStore = (): ResetStoreAction => ({
  type: UserActionType.ResetStore,
});
