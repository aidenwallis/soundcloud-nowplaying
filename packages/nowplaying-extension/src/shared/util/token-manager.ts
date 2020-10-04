import {Storage} from "./storage";

const ACCESS_TOKEN_KEY = "tokens/access-token";
const REFRESH_TOKEN_KEY = "tokens/refresh-token";

export class TokenManager {
  public static getAccessToken(): Promise<string | null> {
    return Storage.get(ACCESS_TOKEN_KEY, null);
  }

  public static getRefreshToken(): Promise<string | null> {
    return Storage.get(REFRESH_TOKEN_KEY, null);
  }

  public static onTokenChange(cb: (token: string) => void) {
    Storage.onChanged<string>(ACCESS_TOKEN_KEY, cb);
  }

  public static setTokens(accessToken: string, refreshToken: string) {
    Storage.set(ACCESS_TOKEN_KEY, accessToken);
    Storage.set(REFRESH_TOKEN_KEY, refreshToken);
  }

  public static clearTokens() {
    Storage.remove(ACCESS_TOKEN_KEY);
    Storage.remove(REFRESH_TOKEN_KEY);
  }
}
