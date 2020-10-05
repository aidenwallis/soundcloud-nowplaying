import EventEmitter from "eventemitter3";
import {config} from "../config";
import {RefreshTokenResponse} from "../types/models/auth";
import {Overlay} from "../types/models/overlay";
import {AuthenticatedUser} from "../types/models/user";
import {
  ApiClient,
  ApiClientMethod,
  ApiClientRequestConfig,
} from "../util/api-client";
import {TokenManager} from "../util/token-manager";

const accessToken = TokenManager.getAccessToken();
const baseHeaders = {"Content-Type": "application/json"};

export class ApiService {
  private static client = new ApiClient({
    baseUrl: config.api.baseUrl,
    headers: accessToken
      ? {
          ...baseHeaders,
          Authorization: `Bearer ${accessToken}`,
        }
      : baseHeaders,
  });
  public static eventEmitter = new EventEmitter();

  public static getUser(): Promise<AuthenticatedUser> {
    return this.request<AuthenticatedUser>({
      method: ApiClientMethod.GET,
      url: "v1/user",
    });
  }

  public static getOverlays(): Promise<Overlay[]> {
    return this.request<{data: Overlay[]}>({
      method: ApiClientMethod.GET,
      url: "v1/overlays",
    }).then((r) => r.data);
  }

  public static createOverlay(name: string): Promise<Overlay> {
    return this.request<Overlay>({
      method: ApiClientMethod.POST,
      url: "v1/overlays",
      body: JSON.stringify({name: name}),
    });
  }

  private static async refreshToken(refreshToken: string): Promise<void> {
    try {
      const response = await this.client.post<RefreshTokenResponse>(
        "v1/auth/refresh-token",
        {refreshToken},
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
