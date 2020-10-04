import {PlayerStateModel} from "../../shared/models/player-state";
import {ApiClient} from "./api-client";

export class ApiService {
  private static client = new ApiClient({
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:7777/"
        : "https://nowplaying-api.aidenwallis.co.uk/",
    headers: {},
  });

  public static setToken(token: string | null) {
    if (!token) {
      delete this.client.headers["Authorization"];
      return;
    }
    this.client.headers["Authorization"] = `Bearer ${token}`;
  }

  public static pushState(state: PlayerStateModel) {
    return this.client.patch("v1/extension/soundcloud", {body: state});
  }
}
