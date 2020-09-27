import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {userReducer} from "./user/reducer";

const enhancers = applyMiddleware(thunkMiddleware);

export const store = createStore(
  combineReducers({
    user: userReducer,
  }),
  composeWithDevTools(enhancers),
);
