import {PlayerStateModel} from "../../shared/models/player-state";
import {AuthManagerModule} from "../../shared/modules/auth-manager";
import {ApiService} from "../../shared/util/api-request";
import {Messenger, MessengerEvent} from "../../shared/util/messenger";

export class SongChangeModule {
  private timer: NodeJS.Timeout | null = null;
  private state: PlayerStateModel;

  public constructor(private messenger: Messenger) {}

  public register() {
    this.messenger.on(MessengerEvent.PlayerState, (state: PlayerStateModel) =>
      this.handleState(state),
    );
  }

  private handleState(state: PlayerStateModel) {
    // wait a second to flush to api in case any other dom element changes (maybe album cover was slow)
    this.dedupeFlushTimer(1000);
    this.state = state;
    console.log(state);
  }

  private dedupeFlushTimer(timeout: number) {
    if (!this.timer) {
      // flush to api, but give up to a second in case we get any
      // other change events from the DOM.
      this.timer = setTimeout(() => this.flush(), timeout);
    }
  }

  private flush() {
    this.timer = null;

    console.log(AuthManagerModule.isAuthenticated);
    if (!AuthManagerModule.isAuthenticated) {
      return;
    }

    // flush new state to api
    ApiService.pushState(this.state)
      .then(() => {
        console.log("sent new state to api");
      })
      .catch((error) => {
        console.error("Failed to push new state to API", error.toString());
        // try and flush again in 5s
        this.dedupeFlushTimer(5000);
      });
  }
}
