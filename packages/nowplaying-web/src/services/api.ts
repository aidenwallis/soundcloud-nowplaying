import {config} from "../config";
import {AuthenticatedUser} from "../types/models/user";
import {ApiClient} from "../util/api-client";
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

  public static getUser(): Promise<AuthenticatedUser> {
    return this.client.get<AuthenticatedUser>("v1/user").then((r) => r.body);
  }
}
