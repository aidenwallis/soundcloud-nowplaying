import {FastifyReply, FastifyRequest} from "fastify";
import {PlayerModel} from "../../../models/player";
import {PlayerState} from "../../../types/enums/player-state";
import * as log from "../../../util/log";
import {PlayerService} from "../services/player";

interface SetSoundcloudStateRequest {
  Body: {
    state: PlayerState;
    song: {
      title: string;
      artist: string;
      cover: string;
    };
  };
}

export function setSoundCloudState(
  req: FastifyRequest<SetSoundcloudStateRequest>,
  reply: FastifyReply,
) {
  return PlayerModel.updateOne(
    {user: req.user.id},
    {
      playerState: req.body.state,
      songState: req.body.song
        ? {
            title: req.body.song.title,
            artist: req.body.song.artist,
            cover: req.body.song.cover,
          }
        : null,
    },
  )
    .then((state) => {
      // async push state to sockets
      PlayerService.pushPlayerState(state);
      reply.send({success: true});
    })
    .catch((error) => {
      log.error("Failed to update player state", error.toString());
      reply.code(500).send({error: "Failed to update state."});
    });
}
