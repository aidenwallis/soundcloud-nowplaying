import {FastifyInstance} from "fastify";
import * as controller from "../controllers/extension";
import {authMiddleware} from "../middleware/auth";

export class ExtensionRoutes {
  public static async register(fastify: FastifyInstance) {
    fastify.addHook("preHandler", authMiddleware);
    fastify.patch(
      "/extension/soundcloud",
      {
        schema: {
          body: {
            properties: {
              player: {type: "number", min: 0, max: 1},
              song: {
                properties: {
                  title: {type: "string", minLength: 1},
                  artist: {type: "string", minLength: 1},
                  cover: {type: "string", minLength: 1},
                },
              },
            },
            required: ["playerState"],
          },
        },
      },
      controller.setSoundCloudState,
    );
  }
}
