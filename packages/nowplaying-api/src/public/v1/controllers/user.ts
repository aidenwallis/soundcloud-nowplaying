import {FastifyReply, FastifyRequest} from "fastify";

export function getUserInfo(request: FastifyRequest, reply: FastifyReply) {
  reply.send({
    id: request.user.id,
    login: request.user.login,
    displayName: request.user.displayName,
    avatar: request.user.avatar,
    provider: request.user.provider,
    providerId: request.user.providerId,
    broadcasterType: request.user.broadcasterType,
    type: request.user.type,
    createdAt: request.user.createdAt,
  });
}
