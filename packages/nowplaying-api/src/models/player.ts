import * as mongoose from "mongoose";
import {PlayerState} from "../types/enums/player-state";

export interface PlayerDocument extends mongoose.Document {
  user: string;
  playerState: PlayerState;
  songState: {
    artist: string;
    title: string;
    cover: string;
  } | null;
}

export const PlayerSchema = new mongoose.Schema<PlayerDocument>(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    playerState: {
      required: true,
      type: Number,
      enum: Object.values(PlayerState),
      default: PlayerState.Paused,
    },
    songState: {
      type: {
        artist: {type: String, required: true},
        title: {type: String, required: true},
        cover: {type: String, required: true},
      },
      nullable: true,
      default: null,
    },
  },
  {timestamps: true},
);

PlayerSchema.index({user: 1}, {unique: true});

export const PlayerModel = mongoose.model<
  PlayerDocument,
  mongoose.Model<PlayerDocument>
>("Player", PlayerSchema);
