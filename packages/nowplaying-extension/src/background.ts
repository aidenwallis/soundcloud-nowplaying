import {SongChangeModule} from "./background/modules/song-change";
import {AuthManagerModule} from "./shared/modules/auth-manager";
import {ModuleRegistry} from "./shared/registry";
import {Messenger} from "./shared/util/messenger";

(() => {
  const messenger = new Messenger();
  new ModuleRegistry([
    AuthManagerModule,
    new SongChangeModule(messenger),
  ]).register();
})();
