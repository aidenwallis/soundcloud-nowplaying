import EventEmitter from "eventemitter3";
import {config} from "../config";
import {RefreshTokenResponse} from "../types/models/auth";
import {AuthenticatedUser} from "../types/models/user";
import {
  ApiClient,
  ApiClientMethod,
  ApiClientRequestConfig,
} from "../util/api-client";
import {TokenManager} from "../util/token-manager";

const accessToken = TokenManager.getAccessToken();

export class ApiService {
  private static client = new ApiClient({
    baseUrl: config.api.baseUrl,
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : undefined,
  });
  public static eventEmitter = new EventEmitter();

  public static getUser(): Promise<AuthenticatedUser> {
    return this.request<AuthenticatedUser>({
      method: ApiClientMethod.GET,
      url: "v1/user",
    });
  }

  private static async refreshToken(refreshToken: string): Promise<void> {
    try {
      const response = await this.client.post<RefreshTokenResponse>(
        "v1/auth/refresh-token",
        {body: {refreshToken}},
      );
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
    } catch (ex) {
      console.error("Failed to refresh token", ex);
      this.logout();
    }
  }

  public static logout() {
    TokenManager.logout();
    this.eventEmitter.emit("logout");
  }

  private static request<T>(options: ApiClientRequestConfig): Promise<T> {
    return this.client.request<T>(options).then((response) => {
      if (response.status === 401) {
        const refreshToken = TokenManager.getRefreshToken();
        if (!refreshToken) {
          this.logout();
          return response.body;
        }

        return this.refreshToken(refreshToken)
          .then(() => this.request<T>(options))
          .catch(() => {
            this.logout();
            return response.body;
          });
      }
      return response.body;
    });
  }
}
