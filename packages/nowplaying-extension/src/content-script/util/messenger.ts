import {browser} from "webextension-polyfill-ts";
import {PlayerStateModel} from "../../shared/models/player-state";

export class Messenger {
  public static sendState(playerState: PlayerStateModel) {
    // Sends the updated state to the background script. If multiple tabs are open the background script will
    // figure out if the same events are sent and debounce to ensure all info is updated on a song change, that's
    // not the responsibility of the content-script.
    browser.runtime.sendMessage(playerState);
  }
}
