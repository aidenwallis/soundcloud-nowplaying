import * as crypto from "crypto";

export class Random {
  public static generateToken(length: number): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(length / 2, (err, buffer) => {
        if (err) return reject(err);
        return resolve(buffer.toString("hex").slice(0, length));
      });
    });
  }
}
