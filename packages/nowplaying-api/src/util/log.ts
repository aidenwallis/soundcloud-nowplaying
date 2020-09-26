import * as pino from "pino";

const logger = pino({
  name: "soundcloud-nowplaying-api",
  level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  prettyPrint: {
    levelFirst: true,
  },
});

export function info(msg: string, ...args: unknown[]) {
  logger.info(msg, ...args);
}

export function error(msg: string, ...args: unknown[]) {
  console.log(args);
  logger.error(msg, ...args);
}

export function debug(msg: string, ...args: unknown[]) {
  logger.debug(msg, ...args);
}

export function warn(msg: string, ...args: unknown[]) {
  logger.warn(msg, ...args);
}
