import Plyr from "plyr";

export function initPlyrPlayers(selector, controls = {}) {
  const players = [];

  document.querySelectorAll(selector).forEach((item) => {
    const player = new Plyr(item, { controls });
    player.on("play", () => players.forEach((p) => p !== player && p.pause()));
    players.push(player);
  });

  return players;
}

export const videoControls = [
  "play-large",
  "play",
  "progress",
  "current-time",
  "mute",
  "volume",
  "settings",
  "pip",
  "fullscreen",
  "download",
];

export const audioControls = [
  "play-large",
  "play",
  "progress",
  "current-time",
  "mute",
  "volume",
  "download",
];
