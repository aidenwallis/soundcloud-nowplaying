import * as Cookie from "js-cookie";

const ACCESS_TOKEN_COOKIE_NAME = "scnp_accesstoken";
const REFRESH_TOKEN_COOKIE_NAME = "scnp_refreshtoken";

export class TokenManager {
  public static getAccessToken(): string | null {
    return Cookie.get(ACCESS_TOKEN_COOKIE_NAME) || null;
  }

  public static getRefreshToken(): string | null {
    return Cookie.get(REFRESH_TOKEN_COOKIE_NAME) || null;
  }

  public static setTokens(accessToken: string, refreshToken: string) {
    Cookie.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      expires: new Date(Date.now() + 1800 * 1000),
    });
    Cookie.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      expires: new Date(Date.now() + 86400 * 60 * 1000),
    });
  }

  public static logout() {
    Cookie.remove(ACCESS_TOKEN_COOKIE_NAME);
    Cookie.remove(REFRESH_TOKEN_COOKIE_NAME);
  }
}
