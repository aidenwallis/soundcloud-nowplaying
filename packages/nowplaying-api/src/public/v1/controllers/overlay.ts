import {FastifyReply, FastifyRequest} from "fastify";
import {OverlayModel} from "../../../models/overlay";
import {PlayerProvider} from "../../../types/enums/player-provider";
import * as log from "../../../util/log";
import {Random} from "../../../util/random";
import {OverlayService} from "../services/overlay";

export function getOverlays(req: FastifyRequest, reply: FastifyReply) {
  return OverlayModel.find({user: req.user.id})
    .sort({name: 1})
    .then((overlays) => {
      reply.send({
        data: overlays.map((overlay) => ({
          id: overlay.id,
          name: overlay.name,
          provider: overlay.provider,
          password: overlay.password,
          createdAt: overlay.createdAt,
        })),
      });
    });
}

interface CreateOverlayRequest {
  Body: {name: string};
}

export async function createOverlay(
  req: FastifyRequest<CreateOverlayRequest>,
  reply: FastifyReply,
) {
  const password = await Random.generateToken(15);
  const overlays = await OverlayService.getUserOverlaysCached(req.user.id);
  if (overlays.length > 10) {
    return reply
      .code(500)
      .send({error: "You may not have more than 10 overlays."});
  }
  try {
    const overlay = new OverlayModel({
      user: req.user.id,
      name: req.body.name,
      provider: PlayerProvider.SoundCloud,
      password: password,
    });
    await overlay.save();
    reply.send({
      id: overlay.id,
      name: overlay.name,
      password: overlay.password,
      provider: overlay.provider,
      createdAt: overlay.createdAt,
    });
  } catch (ex) {
    log.error("Failed to create overlay: " + ex.toString());
    reply.code(500).send({error: "Failed to create overlay."});
  }
}

interface DeleteOverlayRequest {
  Params: {overlayId: string};
}

export function deleteOverlay(
  req: FastifyRequest<DeleteOverlayRequest>,
  reply: FastifyReply,
) {
  return OverlayModel.deleteOne({_id: req.params.overlayId, user: req.user.id})
    .then((res) => {
      if (res.deletedCount === 0) {
        return reply.code(400).send({error: "Overlay not found."});
      }
      reply.send({success: true});
    })
    .catch((error) => {
      log.error("Failed to delete overlay: " + error.toString());
      reply.code(500).send({error: "Failed to delete overlay."});
    });
}
