import {FastifyInstance} from "fastify";
import * as controller from "../controllers/overlay";
import {authMiddleware} from "../middleware/auth";

export class OverlayRoutes {
  public static async register(fastify: FastifyInstance) {
    fastify.addHook("preHandler", authMiddleware);

    fastify.get("/overlays", controller.getOverlays);

    fastify.post(
      "/overlays",
      {
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
