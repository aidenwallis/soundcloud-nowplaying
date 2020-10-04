import {parseUrlParams} from "./shared/helpers/parse-url-params";
import {TokenManager} from "./shared/util/token-manager";

(() => {
  const params = parseUrlParams((window.location.hash || "").substring(1));
  window.location.hash = "";

  if (params.accessToken && params.refreshToken) {
    TokenManager.setTokens(params.accessToken, params.refreshToken);
  }

  window.close();
})();
