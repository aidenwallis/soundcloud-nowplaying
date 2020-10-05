import * as mongoose from "mongoose";
import {PlayerProvider} from "../types/enums/player-provider";
import {Redis} from "../util/redis";

export interface OverlayDocument extends mongoose.Document {
  user: string;
  password: string;
  name: string;
  provider: PlayerProvider;
  createdAt: Date;
  updatedAt: Date;
  // todo add theming options to overlays :)
}

export const OverlaySchema = new mongoose.Schema<OverlayDocument>(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    provider: {
      type: String,
      enum: Object.values(PlayerProvider),
      default: PlayerProvider.SoundCloud,
      required: true,
    },
  },
  {timestamps: true},
);

OverlaySchema.index({user: 1});

function cacheBust(doc: OverlayDocument) {
  // invalidate user overlays cache
  Redis.del(`overlays::${doc.user}`);
}

OverlaySchema.post("deleteOne", cacheBust);
OverlaySchema.post("save", cacheBust);
OverlaySchema.post("updateOne", cacheBust);

export const OverlayModel = mongoose.model<
  OverlayDocument,
  mongoose.Model<OverlayDocument>
>("Overlay", OverlaySchema);
