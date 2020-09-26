import Axios, {AxiosResponse} from "axios";
import {config} from "../../../config";
import {TwitchHelixResponse, TwitchUser} from "../types/interfaces/twitch-api";

export class TwitchApiService {
  public static client = Axios.create({
    baseURL: "https://api.twitch.tv/helix/",
    timeout: 5000,
    headers: {"Client-ID": config.twitch.clientId},
  });

  public static async getUserFromToken(
    token: string,
  ): Promise<TwitchUser | null> {
    return this.client
      .get<undefined, AxiosResponse<TwitchHelixResponse<TwitchUser>>>("users", {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((r) => r?.data?.data[0] ?? null);
  }
}
