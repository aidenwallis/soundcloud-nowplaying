import {FastifyInstance, RegisterOptions} from "fastify";
import * as auth from "./routes/auth";
import * as user from "./routes/user";

export function register(
  fastify: FastifyInstance,
  _: RegisterOptions,
  done: () => void,
) {
  fastify.register(auth.register);
  fastify.register(user.register);
  done();
}
