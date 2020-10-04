import {parseUrlParams} from "./shared/helpers/parse-url-params";
import {Messenger} from "./shared/util/messenger";
import {TokenManager} from "./shared/util/token-manager";

(() => {
  const params = parseUrlParams((window.location.hash || "").substring(1));
  window.location.hash = "";

  const messenger = new Messenger();
  const tokenManager = new TokenManager(messenger);

  if (params.accessToken && params.refreshToken) {
    tokenManager.setTokens(params.accessToken, params.refreshToken);
  }

  window.close();
})();
