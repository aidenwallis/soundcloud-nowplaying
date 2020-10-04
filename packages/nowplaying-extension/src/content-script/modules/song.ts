import {PlayerState} from "../../shared/enums/player-state";
import {PlayerStateModel} from "../../shared/models/player-state";
import {SongModel} from "../../shared/models/song";
import {Messenger} from "../../shared/util/messenger";

const backgroundImageUrlRegex = /^url\(["']?([^"']+)["']?\)$/i;

export class SongModule {
  private playbackNode: Element | null = null;
  private playbackObserver: MutationObserver | null = null;

  public constructor(private messenger: Messenger) {}

  public register() {
    console.log("NowPlaying :: SongModule registered.");
    this.findPlaybackNode();
  }

  private findPlaybackNode() {
    console.log(
      "NowPlaying :: Polling every 100ms to find the playback node in DOM.",
    );
    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        const playbackNode = document.querySelector(".playbackSoundBadge");
        if (!playbackNode) return;

        clearInterval(interval);
        this.playbackNode = playbackNode;
        this.playbackObserver && this.playbackObserver.disconnect();
        this.playbackObserver = new MutationObserver(() => {
          requestAnimationFrame(() => this.handlePlaybackChange());
        });
        this.playbackObserver.observe(this.playbackNode, {
          attributes: true,
          childList: true,
        });
        this.validateObserver();
        setTimeout(() => this.handlePlaybackChange(), 100);
      });
    }, 100);
  }

  private validateObserver() {
    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        if (this.playbackNode) {
          return;
        }

        clearInterval(interval);
        this.playbackNode = null;
        this.playbackObserver.disconnect();
        this.playbackObserver = undefined;
        this.findPlaybackNode();
      });
    }, 1000);
  }

  private handlePlaybackChange() {
    if (!this.playbackNode) {
      return;
    }
    const currentAvatar = this.findCurrentAvatar();
    const titleContextNode = this.playbackNode.querySelector(
      ".playbackSoundBadge__titleContextContainer",
    );
    if (!titleContextNode) {
      console.error(
        "NowPlaying :: Failed to find title context node.",
        titleContextNode,
      );
      return;
    }
    const currentArtist = this.findCurrentArtist(titleContextNode);
    const currentTitle = this.findCurrentTitle(titleContextNode);
    if (!(currentAvatar && currentArtist && currentTitle)) {
      console.error(
        "NowPlaying :: Failed to obtain satisfactory player info.",
        {currentAvatar, currentArtist, currentTitle},
      );
      return;
    }

    this.messenger.sendState(
      new PlayerStateModel(
        this.playbackNode.classList.contains("paused")
          ? PlayerState.Paused
          : PlayerState.Playing,
        new SongModel(currentTitle, currentArtist, currentAvatar),
      ),
    );
  }

  private findCurrentAvatar(): string {
    const parentNode = this.playbackNode.querySelector(
      ".playbackSoundBadge__avatar",
    );
    const childNode = parentNode?.children[0]?.children[0] ?? null;
    if (!childNode) {
      console.error(
        "NowPlaying :: Could not find avatar node inside the playback node? ",
        parentNode,
      );
      return "";
    }
    const bgImageMatch = (
      getComputedStyle(childNode).backgroundImage || ""
    ).match(backgroundImageUrlRegex);
    if (bgImageMatch && bgImageMatch[1]) {
      // get a larger image variant.
      return bgImageMatch[1].replace("-t50x50", "-t200x200");
    }
    console.error(
      "NowPlaying :: Weird result from trying to parse the background image URL from the avatar node?",
      bgImageMatch,
    );
    return "";
  }

  private findCurrentArtist(parentNode: Element) {
    const artistNode =
      parentNode.querySelector(".playbackSoundBadge__lightLink") ||
      parentNode.children[0];
    if (!artistNode) {
      console.error(
        "NowPlaying :: Failed to determine a valid artist node.",
        parentNode,
      );
      return "";
    }
    return artistNode.textContent || artistNode.getAttribute("title") || "";
  }

  private findCurrentTitle(parentNode: Element) {
    const titleNode = parentNode.querySelector(".playbackSoundBadge__title");
    if (!titleNode) {
      console.error(
        "NowPlaying :: Failed to find title parent node.",
        parentNode,
      );
      return "";
    }

    const childNode =
      parentNode.querySelector(".playbackSoundBadge__titleLink") ||
      parentNode.children[0];
    if (!childNode) {
      console.error(
        "NowPlaying :: Failed to find title child node.",
        parentNode,
      );
      return "";
    }

    return (
      childNode.getAttribute("title") || childNode.lastChild?.textContent || ""
    );
  }
}
