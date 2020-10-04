import EventEmitter from "eventemitter3";
import {browser} from "webextension-polyfill-ts";
import {PlayerStateModel} from "../../shared/models/player-state";

export enum MessengerEvent {
  Authenticated = "AUTHENTICATED",
  PlayerState = "PLAYER_STATE",
}

interface MessengerMessage<T, P> {
  type: T;
  payload: P;
}

type AuthenticatedMessage = MessengerMessage<
  typeof MessengerEvent.Authenticated,
  string
>;

type PlayerStateMessage = MessengerMessage<
  typeof MessengerEvent.PlayerState,
  PlayerStateModel
>;

type MessengerMessages = AuthenticatedMessage | PlayerStateMessage;

export class Messenger extends EventEmitter {
  public constructor() {
    super();

    browser.runtime.onMessage.addListener((m: MessengerMessages) =>
      this.handleMessage(m),
    );
  }

  public sendState(playerState: PlayerStateModel) {
    // Sends the updated state to the background script. If multiple tabs are open the background script will
    // figure out if the same events are sent and debounce to ensure all info is updated on a song change, that's
    // not the responsibility of the content-script.
    console.log(
      "NowPlaying :: Sending player state to background worker.",
      JSON.stringify(playerState),
    );
    this.sendMessage({type: MessengerEvent.PlayerState, payload: playerState});
  }

  public sendMessage(message: MessengerMessages) {
    browser.runtime.sendMessage(message).catch((error) => {
      console.log(`Failed to send runtime message`, error);
    });
  }

  private handleMessage(message: MessengerMessages) {
    this.emit(message.type, message.payload);
  }
}
