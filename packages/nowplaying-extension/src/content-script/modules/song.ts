import {Messenger} from "../util/messenger";

export class SongModule {
  public constructor(private messenger: Messenger) {}

  public register() {
    console.log("NowPlaying :: SongModule registered.");
  }
}
