import {FastifyInstance} from "fastify";
import * as controller from "../controllers/overlay";
import {authMiddleware} from "../middleware/auth";

export class OverlayRoutes {
  public static async register(fastify: FastifyInstance) {
    fastify.get(
      "/overlays",
      {preHandler: [authMiddleware]},
      controller.getOverlays,
    );
    fastify.get(
      "/overlays/:overlayId",
      {
        schema: {
          params: {
            properties: {
              overlayId: {type: "string", minLength: 10},
            },
            required: ["overlayId"],
          },
          querystring: {
            properties: {
              password: {type: "string", minLength: 15, maxLength: 15},
            },
            required: ["password"],
          },
        },
      },
      controller.getOverlay,
    );

    fastify.post(
      "/overlays",
      {
        preHandler: [authMiddleware],
        schema: {
          body: {
            type: "object",
            properties: {
              name: {type: "string", minLength: 1},
            },
            required: ["name"],
          },
        },
      },
      controller.createOverlay,
    );

    fastify.delete(
      "/overlays/:overlayId",
      {
        preHandler: [authMiddleware],
        schema: {
          params: {
            properties: {
              overlayId: {type: "string", minLength: 10},
            },
            required: ["overlayId"],
          },
        },
      },
      controller.deleteOverlay,
    );
  }
}
