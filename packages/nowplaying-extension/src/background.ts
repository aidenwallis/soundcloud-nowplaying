import {SongChangeModule} from "./background/modules/song-change";
import {AuthManagerModule} from "./shared/modules/auth-manager";
import {ModuleRegistry} from "./shared/registry";
import {Messenger} from "./shared/util/messenger";
import {TokenManager} from "./shared/util/token-manager";

(() => {
  const messenger = new Messenger();
  const tokenManager = new TokenManager(messenger);
  const authManager = new AuthManagerModule(tokenManager, messenger);
  new ModuleRegistry([
    authManager,
    new SongChangeModule(authManager, messenger),
  ]).register();
})();
