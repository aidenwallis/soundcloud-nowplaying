import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {overlaysReducer} from "./overlays/reducer";
import {userReducer} from "./user/reducer";

const enhancers = applyMiddleware(thunkMiddleware);

export const store = createStore(
  combineReducers({
    overlays: overlaysReducer,
    user: userReducer,
  }),
  composeWithDevTools(enhancers),
);
