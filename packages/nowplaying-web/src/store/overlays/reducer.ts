import {Overlay} from "../../types/models/overlay";
import {OverlaysActionType, OverlaysStoreActions} from "./actions";

export interface OverlaysStore {
  error: string;
  loading: boolean;
  overlays: Overlay[];
  submitting: boolean;
}

const getInitialState = (): OverlaysStore => ({
  error: "",
  loading: false,
  overlays: [],
  submitting: false,
});

export function overlaysReducer(
  state: OverlaysStore = getInitialState(),
  action: OverlaysStoreActions,
): OverlaysStore {
  switch (action.type) {
    case OverlaysActionType.SetLoading: {
      return {...state, loading: action.payload};
    }

    case OverlaysActionType.SetError: {
      return {...state, error: action.payload};
    }

    case OverlaysActionType.SetOverlays: {
      return {...state, overlays: action.payload};
    }

    case OverlaysActionType.SetSubmitting: {
      return {...state, submitting: action.payload};
    }

    default: {
      return state;
    }
  }
}
