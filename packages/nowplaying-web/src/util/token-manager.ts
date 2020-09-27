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

  public static logout() {
    Cookie.remove(ACCESS_TOKEN_COOKIE_NAME);
    Cookie.remove(REFRESH_TOKEN_COOKIE_NAME);
  }
}
