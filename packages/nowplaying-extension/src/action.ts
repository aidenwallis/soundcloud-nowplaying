import {browser} from "webextension-polyfill-ts";
import {AUTHENTICATED_TEMPLATE} from "./action/partials/authenticated";
import {UNAUTHENICATED_TEMPLATE} from "./action/partials/unauthenticated";
import {AuthManagerModule} from "./shared/modules/auth-manager";
import {Messenger} from "./shared/util/messenger";
import {TokenManager} from "./shared/util/token-manager";

declare const process: {
  env: {
    WEB_BASE: string;
  };
};

const WEB_BASE = process.env.WEB_BASE;

(() => {
  const appElement = document.getElementById("app");
  const messenger = new Messenger();
  const tokenManager = new TokenManager(messenger);
  const authManager = new AuthManagerModule(tokenManager, messenger);
  authManager.onAuthenticated((authenticated: boolean) => {
    appElement.innerHTML = authenticated
      ? AUTHENTICATED_TEMPLATE
      : UNAUTHENICATED_TEMPLATE;

    // shitty way to event bind :)
    console.log(browser.runtime.getURL("auth-callback.html"));
    if (authenticated) {
      document.getElementById("sign-out").onclick = () => {
        tokenManager.clearTokens();
      };
    } else {
      document.getElementById("login-button").onclick = () => {
        window.open(
          WEB_BASE +
            "extension-redirect?return=" +
            encodeURIComponent(browser.runtime.getURL("auth-callback.html")),
          "_blank",
          "titlebar=no,resizable=no,height=600,width=600,fullscreen=no",
        );
      };
    }
  });
  authManager.register();
})();
