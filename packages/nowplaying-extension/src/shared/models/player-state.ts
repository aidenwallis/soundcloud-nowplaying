import {PlayerState} from "../enums/player-state";
import {SongModel} from "./song";

export class PlayerStateModel {
  public constructor(
    public readonly state: PlayerState,
    public readonly song: SongModel,
  ) {}
}
