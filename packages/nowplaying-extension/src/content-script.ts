/**
 * This is the entrypoint that we have whenever a new SoundCloud tab is opened.
 */
import {SongModule} from "./content-script/modules/song";
import {Messenger} from "./content-script/util/messenger";
import {ModuleRegistry} from "./shared/registry";

(() => {
  console.log("Starting NowPlaying scraper.");
  const messenger = new Messenger();
  new ModuleRegistry([new SongModule(messenger)]).register();
})();
