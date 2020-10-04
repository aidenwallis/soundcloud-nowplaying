import {Messenger} from "./messenger";
import {Storage} from "./storage";

const ACCESS_TOKEN_KEY = "tokens/access-token";
const REFRESH_TOKEN_KEY = "tokens/refresh-token";

export class TokenManager {
  public constructor(private messenger: Messenger) {}

  public getAccessToken(): Promise<string | null> {
    return Storage.get(ACCESS_TOKEN_KEY, null);
  }

  public setTokens(accessToken: string, refreshToken: string) {
    Storage.set(ACCESS_TOKEN_KEY, accessToken);
    Storage.set(REFRESH_TOKEN_KEY, refreshToken);
    this.messenger.updateToken(accessToken);
  }

  public clearTokens() {
    Storage.remove(ACCESS_TOKEN_KEY);
    Storage.remove(REFRESH_TOKEN_KEY);
    this.messenger.updateToken("");
  }
}
