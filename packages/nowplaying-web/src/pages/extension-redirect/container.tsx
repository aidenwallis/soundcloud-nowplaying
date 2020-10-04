import * as React from "react";
import {AuthGuard} from "../../components/auth-guard";
import {ExtensionRedirectComponent} from "./component";

export const ExtensionRedirect: React.FunctionComponent = () => {
  return (
    <AuthGuard>
      <ExtensionRedirectComponent />
    </AuthGuard>
  );
};
