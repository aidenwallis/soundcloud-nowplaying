import {FastifyReply, FastifyRequest} from "fastify";
import {config} from "../../../config";
import {User, UserModel} from "../../../models/user";
import * as log from "../../../util/log";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRY_MS,
  AuthService,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRY_MS,
} from "../services/auth";
import {TwitchApiService} from "../services/twitch-api";
import {TwitchAuthService} from "../services/twitch-auth";
import {UserService} from "../services/user";
import {PublicRequest} from "../types/interfaces/request";
import {TwitchUser} from "../types/interfaces/twitch-api";
import {
  TwitchOAuthStatePayload,
  TwitchOAuthTokenResponse,
} from "../types/interfaces/twitch-auth";

const isProduction = process.env.NODE_ENV === "production";
const cookieOpts = {
  domain: isProduction ? "soundcloud.aidenwallis.co.uk" : undefined,
  secure: isProduction,
  path: "/",
  httpOnly: false,
};

export interface TwitchRedirectRequest {
  Querystring: {return_to?: string};
}

export async function twitchRedirect(
  req: PublicRequest<TwitchRedirectRequest>,
  reply: FastifyReply,
) {
  try {
    const state = await TwitchAuthService.getAuthState(
      req.query.return_to || "",
    );
    reply.redirect(302, TwitchAuthService.getAuthURL(state));
  } catch (ex) {
    reply.status(500).send({
      error: "Failed to generate auth URL. Please try again later.",
    });
  }
}

export interface TwitchCallbackRequest {
  Querystring: {code: string; state: string};
}

export async function twitchCallback(
  req: PublicRequest<TwitchCallbackRequest>,
  reply: FastifyReply,
) {
  const code = req.query.code.trim();
  const stateToken = req.query.state.trim();
  if (!(code && stateToken)) {
    return reply.status(400).send({error: "code and state must be defined"});
  }

  let state: TwitchOAuthStatePayload;
  try {
    state = await TwitchAuthService.getStateFromToken(stateToken);
    if (!state) {
      throw new Error("state not found");
    }
  } catch (ex) {
    return reply.status(400).send({error: "Invalid state"});
  }

  let twitchTokens: TwitchOAuthTokenResponse;
  try {
    twitchTokens = await TwitchAuthService.getTokens(code);
  } catch (ex) {
    log.error("Failed to validate twitch tokens from code", ex.toString());
    return reply
      .status(500)
      .send({error: "Twitch failed to send us your tokens. Try again?"});
  }

  let twitchUser: TwitchUser;
  try {
    twitchUser = await TwitchApiService.getUserFromToken(
      twitchTokens.access_token,
    );
    if (!twitchUser) {
      throw new Error("twitch user not in helix response");
    }
  } catch (ex) {
    log.error("Failed to get Twitch user from helix", ex.toString());
    return reply
      .status(500)
      .send({error: "Twitch failed to return your user. Try again?"});
  }

  log.info(`${twitchUser.display_name} xd`);

  let user: User;
  try {
    user = await UserService.upsertTwitchUser(twitchUser, twitchTokens);
  } catch (ex) {
    return reply.status(500).send({
      error: "Failed to upsert user into database. Please try again later.",
    });
  }

  let accessToken = "";
  let refreshToken = "";
  try {
    [accessToken, refreshToken] = await AuthService.generateTokens(user);
    if (!(accessToken && refreshToken)) {
      throw new Error("either refresh or access token is empty?");
    }
  } catch (ex) {
    return reply.status(500).send({
      error: "Failed to generate access tokens, please try again later.",
    });
  }

  reply.setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    ...cookieOpts,
    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY_MS),
  });
  reply.setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    ...cookieOpts,
    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
  });

  let returnURL: string = state.returnTo;
  if (!returnURL) {
    returnURL = config.mainSiteURL;
  }

  reply.redirect(302, returnURL);
}

export interface RefreshTokenRequest {
  Body: {refreshToken: string};
}

export async function refreshToken(
  request: FastifyRequest<RefreshTokenRequest>,
  reply: FastifyReply,
) {
  try {
    const payload = await AuthService.parseRefreshToken(
      request.body.refreshToken,
    );
    if (!payload) {
      reply.status(400).send({error: "Invalid refresh token."});
      return;
    }

    const user = await UserModel.findById(payload.userId);
    if (!user) {
      throw new Error("no user found");
    }

    const [accessToken, refreshToken] = await AuthService.generateTokens(user);
    return {accessToken: accessToken, refreshToken: refreshToken};
  } catch (ex) {
    reply.status(400).send({error: "Invalid refresh token."});
  }
}
