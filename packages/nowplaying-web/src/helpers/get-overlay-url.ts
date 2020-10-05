export function getOverlayURL(overlayId: string, password: string) {
  return [
    window.location.protocol,
    "",
    window.location.hostname,
    "overlays",
    encodeURIComponent(overlayId),
    encodeURIComponent(password),
  ].join("/");
}
