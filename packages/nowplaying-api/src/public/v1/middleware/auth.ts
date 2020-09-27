import {FastifyReply, FastifyRequest} from "fastify";
import {User, UserModel} from "../../../models/user";
import * as log from "../../../util/log";
import {AuthService} from "../services/auth";

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}
class MiddlewareError extends Error {}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const header = (request.headers.authorization || "").trim();
  if (!header) {
    return reply.status(401).send({error: "Missing auth header."});
  }

  try {
    const [method, token] = header.split(" ");
    if (!(method && token) || method !== "Bearer") {
      throw new MiddlewareError("Invalid auth header.");
    }

    const decodedJWT = await AuthService.parseAccessToken(token);
    if (!decodedJWT) {
      throw new MiddlewareError("Invalid access token.");
    }

    const user = await UserModel.findById(decodedJWT.user.id);
    if (!user || user.jwtVersion !== decodedJWT.jwtVersion) {
      throw new MiddlewareError("Invalid access token.");
    }

    request.jwt = decodedJWT;
    request.user = user;
  } catch (ex) {
    if (ex instanceof MiddlewareError) {
      return reply.status(401).send({error: ex.message});
    }
    log.error("Failed to verify auth header", ex);
    reply.status(401).send({error: "Failed to verify auth header."});
  }
}
