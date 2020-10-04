/**
 * This is the entrypoint that we have whenever a new SoundCloud tab is opened.
 */
import {SongModule} from "./content-script/modules/song";
import {ModuleRegistry} from "./shared/registry";
import {Messenger} from "./shared/util/messenger";

(() => {
  console.log("Starting NowPlaying scraper.");
  const messenger = new Messenger();
  new ModuleRegistry([new SongModule(messenger)]).register();
})();
