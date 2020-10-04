import {ApiService} from "../util/api-request";
import {TokenManager} from "../util/token-manager";

export class AuthManagerModule {
  private static authenticated: boolean | null = null;
  private static authenticatedCb: (authenticated: boolean) => void;

  public static get isAuthenticated() {
    return this.authenticated || false;
  }

  public static register() {
    TokenManager.getAccessToken()
      .then((t) => this.handleAuthenticated(t))
      .catch((error) => {
        console.error("Failed to get access token", error.toString());
      });
    TokenManager.onTokenChange((t) => this.handleAuthenticated(t));
  }

  private static handleAuthenticated(token: string) {
    const authenticated = !!token;
    if (authenticated === this.authenticated) {
      return;
    }

    ApiService.setToken(token);
    this.authenticated = authenticated;
    this.authenticatedCb && this.authenticatedCb(authenticated);
  }

  public static onAuthenticated(done: (authenticated: boolean) => void) {
    this.authenticatedCb = done;
  }
}
