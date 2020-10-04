import {PlayerStateModel} from "../../shared/models/player-state";
import {ApiClient} from "./api-client";
import {TokenManager} from "./token-manager";

declare const process: {
  env: {
    API_BASE: string;
  };
};

export class ApiService {
  private static client = new ApiClient({
    baseUrl: process.env.API_BASE,
    headers: {"Content-Type": "application/json"},
    onE,
  });

  public static setToken(token: string | null) {
    if (!token) {
      delete this.client.headers["Authorization"];
      return;
    }
    this.client.headers["Authorization"] = `Bearer ${token}`;
  }

  private static async refreshToken(refreshToken: string): Promise<void> {
    const response = await this.client.post<{
      accessToken: string;
      refreshToken: string;
    }>("v1/auth/refresh-token", {body: {refreshToken}});
    if (!response?.body?.accessToken) {
      throw new Error("no access_token found");
    }
    TokenManager.setTokens(
      response.body.accessToken,
      response.body.refreshToken,
    );
    this.client.headers[
      "Authorization"
    ] = `Bearer ${response.body.accessToken}`;
  }

  public static pushState(state: PlayerStateModel) {
    return this.client
      .patch("v1/extension/soundcloud", state)
      .then((response) => {
        if (response.status === 401) {
          return TokenManager.getRefreshToken()
            .then((refreshToken) => {
              if (!refreshToken) {
                throw new Error("no refresh token in store");
              }
              return this.refreshToken(refreshToken);
            })
            .then(() => this.pushState(state))
            .catch(() => {
              TokenManager.clearTokens();
              return response.body;
            });
        }
        return response;
      });
  }
}
