import {User, UserModel} from "../../../models/user";
import {OAuthProvider} from "../../../types/enums/oauth-provider";
import {TwitchUser} from "../types/interfaces/twitch-api";
import {TwitchOAuthTokenResponse} from "../types/interfaces/twitch-auth";

export class UserService {
  public static async upsertTwitchUser(
    twitchUser: TwitchUser,
    tokens: TwitchOAuthTokenResponse,
  ): Promise<User> {
    let user = await UserModel.findOne({
      provider: OAuthProvider.Twitch,
      providerId: twitchUser.id,
    });
    if (!user) {
      user = new UserModel();
      // todo: add extra steps for new registrants
    }

    user.login = twitchUser.login;
    user.displayName = twitchUser.display_name;
    user.avatar = twitchUser.profile_image_url;
    user.provider = OAuthProvider.Twitch;
    user.providerId = twitchUser.id;
    user.broadcasterType = twitchUser.broadcaster_type || "user";
    user.type = twitchUser.type || "user";
    user.accessToken = tokens.access_token;
    user.refreshToken = tokens.refresh_token;
    user.tokenExpires = new Date(Date.now() + (tokens.expires_in - 600) * 1000);
    user.tokenScopes = tokens.scope;
    user.lastLogin = new Date();
    await user.save();

    return user;
  }
}
