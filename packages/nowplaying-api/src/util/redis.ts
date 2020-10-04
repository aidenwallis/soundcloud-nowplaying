import * as IORedis from "ioredis";
import {config} from "../config";
import * as log from "./log";

export class Redis {
  private static client = new IORedis({
    ...config.redis,
    keyPrefix: "soundcloud-nowplaying::",
  });

  public static async get<T>(key: string): Promise<T | null> {
    try {
      const res = await this.client.get(key);
      if (!res) {
        return null;
      }
      return JSON.parse(res);
    } catch (ex) {
      log.error("Failed to GET from redis", ex.toString());
      return null;
    }
  }

  public static async set(
    key: string,
    value: unknown,
    expireSeconds?: number,
    nx = false,
  ) {
    const args = [key, JSON.stringify(value)];
    expireSeconds && args.push("EX", expireSeconds.toString());
    nx && args.push("NX");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await this.client.set(...args);
  }

  public static async expireAt(key: string, timestamp: number) {
    await this.client.expireat(key, timestamp);
  }

  public static async exit() {
    await this.client.quit();
  }

  public static async del(...keys: string[]) {
    await this.client.del(keys);
  }

  public static async incr(key: string): Promise<number> {
    return await this.client.incr(key);
  }

  public static async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  public static async publish(topic: string, value: unknown): Promise<void> {
    await this.client.publish(topic, JSON.stringify(value));
  }
}
