import {ApiService} from "../util/api-request";
import {Messenger, MessengerEvent} from "../util/messenger";
import {TokenManager} from "../util/token-manager";

export class AuthManagerModule {
  private authenticated: boolean | null = null;
  private authenticatedCb: (authenticated: boolean) => void;

  public constructor(
    private tokenManager: TokenManager,
    private messenger: Messenger,
  ) {}

  public get isAuthenticated() {
    return this.authenticated || false;
  }

  public register() {
    this.tokenManager.getAccessToken().then((t) => this.handleAuthenticated(t));
    this.messenger.on(MessengerEvent.Authenticated, (t: string) =>
      this.handleAuthenticated(t),
    );
  }

  private handleAuthenticated(token: string) {
    const authenticated = !!token;
    if (authenticated === this.authenticated) {
      return;
    }

    ApiService.setToken(token);
    this.authenticated = authenticated;
    this.authenticatedCb && this.authenticatedCb(authenticated);
  }

  public onAuthenticated(done: (authenticated: boolean) => void) {
    this.authenticatedCb = done;
  }
}
