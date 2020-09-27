import {AuthenticatedUser} from "../../types/models/user";
import {TokenManager} from "../../util/token-manager";
import {UserActionType, UserStoreActions} from "./actions";

export interface UserStore {
  error: string;
  hasToken: boolean;
  loading: boolean;
  user: AuthenticatedUser | null;
}

const getInitialState = (): UserStore => ({
  error: "",
  hasToken: !!TokenManager.getAccessToken(),
  loading: false,
  user: null,
});

export function userReducer(
  state: UserStore = getInitialState(),
  action: UserStoreActions,
): UserStore {
  switch (action.type) {
    case UserActionType.SetLoading: {
      return {...state, loading: action.payload};
    }

    case UserActionType.SetError: {
      return {...state, error: action.payload};
    }

    case UserActionType.SetUser: {
      return {...state, user: action.payload};
    }

    case UserActionType.ResetStore: {
      return getInitialState();
    }

    default: {
      return state;
    }
  }
}
