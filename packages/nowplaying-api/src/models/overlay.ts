import * as mongoose from "mongoose";

export interface OverlayDocument extends mongoose.Document {
  user: string;
  password: string;
  // todo add theming options to overlays
}

export const OverlaySchema = new mongoose.Schema<OverlayDocument>(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    password: {type: String, required: true},
  },
  {timestamps: true},
);

OverlaySchema.index({user: 1});

export const OverlayModel = mongoose.model<
  OverlayDocument,
  mongoose.Model<OverlayDocument>
>("Overlay", OverlaySchema);
