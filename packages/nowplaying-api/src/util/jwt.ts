import * as jwt from "jsonwebtoken";
import {config} from "../config";

const JWT_SECRET = config.jwtSecret;
const OAUTH_SECRET = config.oauthJwtSecret;

export class JWT {
  public static encodeOAuthJWT(
    payload: Record<string, unknown>,
  ): Promise<string> {
    return this.encode(payload, OAUTH_SECRET, {expiresIn: "30m"});
  }

  public static decodeOAuthJWT<T>(token: string): Promise<T> {
    return this.decode(token, OAUTH_SECRET);
  }

  public static encodeAccessJWT(payload: Record<string, unknown>) {
    return this.encode(payload, JWT_SECRET, {expiresIn: "6h"});
  }

  public static encodeRefreshJWT(payload: Record<string, unknown>) {
    return this.encode(payload, JWT_SECRET, {expiresIn: "60d"});
  }

  public static decodeAccessJWT<T>(token: string): Promise<T> {
    return this.decode(token, JWT_SECRET);
  }

  private static encode(
    payload: Record<string, unknown>,
    secret: string,
    options: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, buffer) => {
        if (err) return reject(err);
        return resolve(buffer);
      });
    });
  }

  private static decode<T>(token: string, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return reject(err);
        return resolve((decoded as unknown) as T);
      });
    });
  }
}
