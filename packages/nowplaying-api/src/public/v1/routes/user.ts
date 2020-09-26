import {FastifyInstance, RegisterOptions} from "fastify";
import * as controller from "../controllers/user";
import {authMiddleware} from "../middleware/auth";

export function register(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: () => void,
) {
  fastify.addHook("preHandler", authMiddleware);
  fastify.get("/user", controller.getUserInfo);

  done();
}
