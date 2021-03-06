import {PlayerDocument} from "../../../models/player";
import {Redis} from "../../../util/redis";
import {OverlayService} from "./overlay";

const PLAYER_EVENTS = "nowplaying::player-events";

export class PlayerService {
  public static async pushPlayerState(player: PlayerDocument) {
    const overlays = await OverlayService.getUserOverlaysCached(player.user);
    if (!overlays.length) {
      return;
    }
    const topics = overlays.map((o) => `overlays.${o._id}.${o.password}`);
    // dispatch to sockets
    Redis.publish(PLAYER_EVENTS, {
      topics: topics,
      data: JSON.stringify(player),
    });
  }
}
