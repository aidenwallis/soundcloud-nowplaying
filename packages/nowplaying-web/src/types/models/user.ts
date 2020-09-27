import {OAuthProvider} from "../enums/oauth-provider";

export interface AuthenticatedUser {
  id: string;
  login: string;
  displayName: string;
  avatar: string;
  provider: OAuthProvider;
  providerId: string;
  broadcasterType: string;
  type: string;
  createdAt: string;
}
