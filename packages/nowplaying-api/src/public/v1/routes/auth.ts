import {FastifyInstance} from "fastify";
import * as controller from "../controllers/auth";

export class AuthRoutes {
  public static async register(fastify: FastifyInstance) {
    fastify.get<controller.TwitchRedirectRequest>(
      "/auth/twitch/redirect",
      {
        schema: {
          querystring: {
            return_to: {type: "string"},
          },
        },
      },
      controller.twitchRedirect,
    );

    fastify.get<controller.TwitchCallbackRequest>(
      "/auth/twitch/callback",
      {
        schema: {
          querystring: {
            properties: {
              code: {type: "string", minLength: 1},
              state: {type: "string", minLength: 1},
            },
            required: ["code", "state"],
          },
        },
      },
      controller.twitchCallback,
    );

    fastify.post<controller.RefreshTokenRequest>(
      "/auth/refresh-token",
      {
        schema: {
          body: {
            properties: {
              refreshToken: {type: "string", minLength: 1},
            },
            required: ["refreshToken"],
          },
        },
      },
      controller.refreshToken,
    );
  }
}
