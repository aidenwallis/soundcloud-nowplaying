import {User} from "../../../models/user";
import {OAuthProvider} from "../../../types/enums/oauth-provider";
import {JWT} from "../../../util/jwt";

export const ACCESS_TOKEN_COOKIE_NAME = "scnp_accesstoken";
export const REFRESH_TOKEN_COOKIE_NAME = "scnp_refreshtoken";
export const ACCESS_TOKEN_EXPIRY_MS = 30 * 60 * 1000;
export const REFRESH_TOKEN_EXPIRY_MS = 60 * 86400 * 1000;

enum TokenType {
  AccessToken = "accessToken",
  RefreshToken = "refreshToken",
}

interface AccessJWTUser {
  id: string;
  provider: OAuthProvider;
  providerId: string;
  createdAt: string;
}

interface AccessJWTPayload {
  tokenType: TokenType;
  schemaVersion: number;
  jwtVersion: number;
  user: AccessJWTUser;
}

interface RefreshJWTPayload {
  tokenType: TokenType;
  schemaVersion: number;
  jwtVersion: number;
  userId: string;
}

declare module "fastify" {
  interface FastifyRequest {
    jwt?: AccessJWTPayload;
  }
}

export class AuthService {
  public static generateAccessToken(user: User) {
    return JWT.encodeAccessJWT({
      tokenType: TokenType.AccessToken,
      schemaVersion: 1,
      jwtVersion: user.jwtVersion,
      user: {
        id: user.id,
        provider: user.provider,
        providerId: user.providerId,
        createdAt: user.createdAt,
      },
    });
  }

  public static generateRefreshToken(user: User) {
    return JWT.encodeRefreshJWT({
      tokenType: TokenType.RefreshToken,
      schemaVersion: 1,
      jwtVersion: user.jwtVersion,
      userId: user.id,
    });
  }

  public static async parseAccessToken(
    token: string,
  ): Promise<AccessJWTPayload | null> {
    const decoded = await JWT.decodeAccessJWT<AccessJWTPayload>(token);
    if (!decoded) {
      return null;
    }
    if (
      !(
        decoded.schemaVersion === 1 &&
        decoded.tokenType === TokenType.AccessToken
      )
    ) {
      return null;
    }
    return decoded;
  }

  public static async parseRefreshToken(
    token: string,
  ): Promise<RefreshJWTPayload | null> {
    const decoded = await JWT.decodeAccessJWT<RefreshJWTPayload>(token);
    if (!decoded) {
      return null;
    }

    if (
      !(
        decoded.schemaVersion === 1 &&
        decoded.tokenType === TokenType.RefreshToken
      )
    ) {
      return null;
    }
    return decoded;
  }

  public static generateTokens(user: User): Promise<[string, string]> {
    return Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);
  }
}
