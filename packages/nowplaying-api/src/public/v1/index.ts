import {FastifyInstance, RegisterOptions} from "fastify";
import {AuthRoutes} from "./routes/auth";
import {ExtensionRoutes} from "./routes/extension";
import {OverlayRoutes} from "./routes/overlay";
import {UserRoutes} from "./routes/user";

export function register(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: () => void,
) {
  fastify.register(AuthRoutes.register);
  fastify.register(ExtensionRoutes.register);
  fastify.register(OverlayRoutes.register);
  fastify.register(UserRoutes.register);
  done();
}
