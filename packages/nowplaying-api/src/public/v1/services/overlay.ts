import {OverlayModel} from "../../../models/overlay";
import {Redis} from "../../../util/redis";

export interface UserOverlaySet {
  _id: string;
  password: string;
}

export class OverlayService {
  public static async getUserOverlaysCached(
    userId: string,
  ): Promise<UserOverlaySet[]> {
    const cacheKey = `overlays::${userId}`;
    const fromCache = await Redis.get<UserOverlaySet[]>(cacheKey);
    if (fromCache) {
      return fromCache;
    }
    const overlays = await OverlayModel.find({user: userId})
      .select("_id password")
      .lean();
    Redis.set(cacheKey, overlays, 600);
    return overlays;
  }
}
