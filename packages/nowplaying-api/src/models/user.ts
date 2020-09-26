import * as mongoose from "mongoose";
import {OAuthProvider} from "../types/enums/oauth-provider";

export interface User extends mongoose.Document {
  login: string;
  displayName: string;
  avatar: string;
  provider: OAuthProvider;
  providerId: string;
  broadcasterType: string;
  type: string;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpires: Date | null;
  tokenScopes: string[];
  jwtVersion: number;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new mongoose.Schema(
  {
    login: {type: String, required: true},
    displayName: {type: String, required: true},
    avatar: {type: String, required: true},
    provider: {
      type: String,
      enum: Object.values(OAuthProvider),
      default: OAuthProvider.Twitch,
    },
    broadcasterType: {type: String, required: true, default: "user"},
    type: {type: String, required: true, default: "user"},
    providerId: {type: String, required: true},
    accessToken: {type: String, nullable: true},
    refreshToken: {type: String, nullable: true},
    lastLogin: {type: Date, default: Date.now, required: true},
    tokenExpires: {type: Date, nullable: true},
    tokenScopes: {
      type: [String],
      default: [],
    },
    jwtVersion: {type: Number, default: 1, required: true},
  },
  {versionKey: false, timestamps: true},
);

UserSchema.index({provider: 1, providerId: 1}, {unique: true});

export const UserModel = mongoose.model<User>("User", UserSchema);
