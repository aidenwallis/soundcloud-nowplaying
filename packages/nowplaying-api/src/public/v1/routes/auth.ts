import {FastifyInstance, RegisterOptions} from "fastify";
import * as controller from "../controllers/auth";

export function register(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: () => void,
) {
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

  done();
}
