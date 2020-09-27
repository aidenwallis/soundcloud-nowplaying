import * as React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {MuiBase} from "./components/mui-base";
import {UserManager} from "./components/user-manager";
import {Routes} from "./router";
import {store} from "./store/configureStore";

export const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <MuiBase>
        <UserManager />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiBase>
    </Provider>
  );
};
