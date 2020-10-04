import {FastifyInstance, RegisterOptions} from "fastify";
import {AuthRoutes} from "./routes/auth";
import {UserRoutes} from "./routes/user";

export function register(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: () => void,
) {
  fastify.register(AuthRoutes.register);
  fastify.register(UserRoutes.register);
  done();
}
