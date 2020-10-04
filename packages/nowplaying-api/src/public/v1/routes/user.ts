import {FastifyInstance} from "fastify";
import * as controller from "../controllers/user";
import {authMiddleware} from "../middleware/auth";

export class UserRoutes {
  public static async register(fastify: FastifyInstance) {
    fastify.addHook("preHandler", authMiddleware);
    fastify.get("/user", controller.getUserInfo);
  }
}
