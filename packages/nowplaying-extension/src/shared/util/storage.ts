import {browser} from "webextension-polyfill-ts";

export class Storage {
  public static get<T>(key: string, defaultValue: T): Promise<T> {
    return this.getOptional<T>(key).then((value) => {
      if (value === undefined) {
        return defaultValue;
      }
      return value;
    });
  }

  public static getOptional<T>(key: string): Promise<T | undefined> {
    return browser.storage.local.get(key).then((res) => res[key]);
  }

  public static set(key: string, value: unknown): Promise<void> {
    return browser.storage.local.set({[key]: value});
  }

  public static remove(key: string) {
    return browser.storage.local.remove(key);
  }
}
