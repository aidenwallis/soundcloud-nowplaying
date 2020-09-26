import * as fs from "fs";
import * as path from "path";

export interface Config {
  jwtSecret: string;
  oauthJwtSecret: string;
  mainSiteURL: string;

  mongodb: {
    url: string;
  };

  redis:
    | {
        host: string;
        port?: number;
      }
    | {
        url: string;
      };

  twitch: {
    clientId: string;
    clientSecret: string;
    redirect: string;
  };
}

export const twitchAuthScopes = ["user:read:email"];
export const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../../config.json"), "utf-8"),
) as Config;
