import Axios, {AxiosResponse} from "axios";
import {config, twitchAuthScopes} from "../../../config";
import {JWT} from "../../../util/jwt";
import {
  TwitchOAuthStatePayload,
  TwitchOAuthTokenResponse,
} from "../types/interfaces/twitch-auth";

const TWITCH_OAUTH_BASE = "https://id.twitch.tv/oauth2/";

const TWITCH_AUTHORIZE_URL =
  TWITCH_OAUTH_BASE +
  "authorize" +
  ("?client_id=" + encodeURIComponent(config.twitch.clientId)) +
  "&response_type=code" +
  ("&redirect_uri=" + encodeURIComponent(config.twitch.redirect)) +
  ("&scope=" + encodeURIComponent(twitchAuthScopes.join(" ")));

export class TwitchAuthService {
  private static client = Axios.create({
    baseURL: TWITCH_OAUTH_BASE,
    timeout: 15 * 1000,
  });

  public static getAuthState(returnTo: string): Promise<string> {
    return JWT.encodeOAuthJWT({returnTo});
  }

  public static getAuthURL(state: string): string {
    return TWITCH_AUTHORIZE_URL + "&state=" + encodeURIComponent(state);
  }

  public static getStateFromToken(
    state: string,
  ): Promise<TwitchOAuthStatePayload> {
    return JWT.decodeOAuthJWT(state);
  }

  public static getTokens(code: string): Promise<TwitchOAuthTokenResponse> {
    return this.client
      .post<undefined, AxiosResponse<TwitchOAuthTokenResponse>>(
        "token",
        new URLSearchParams({
          code: code,
          client_id: config.twitch.clientId,
          client_secret: config.twitch.clientSecret,
          redirect_uri: config.twitch.redirect,
          grant_type: "authorization_code",
        }),
      )
      .then((r) => r.data);
  }
}
