import {FastifyRequest} from "fastify";
import {User} from "../../../../models/user";

export interface PublicRequest<T> extends FastifyRequest<T> {
  user: User | null;
}
