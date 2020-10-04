# NowPlaying Extension

The local browser extension for interacting with the NowPlaying backend and relaying SoundCloud playing states. Plain typescript, built with Parcel.

It's pretty barebones and kind of spaghetti, but the point is to keep it really simple and to have as little overhead as possible.

The widget works by every single time you change song/play/pause on SoundCloud, it will relay to the API your new browser state, this is tracked with MutationObservers, and is deduped before being sent to the API, more info on that below.

## Structure

There are 4 entrypoints to the extension:

- action :: The small popup when you click the extension icon. All it does is gives you a place to log in, and displays your authorization status.

- auth-callback :: When you redirect back on the login flow, you hit this page. It takes your tokens, sets it in storage, broadcasts to the other entrypoints that it has a new token then closes.

- background :: This is the background script that's always running, and is outside the scope of the popup or tab. The job is serves is pretty simple, on message from the browser tab with a state change, start a timer, send API request after one second, the difference is the timer helps with deduping player updates, say, if SoundCloud's DOM updates the cover before the song name, we wait up to a second before sending the next request to our API, so the state messages for the other missing data points should be updated in the DOM by that time.

- content-script :: This is the code that physically runs on the SoundCloud page. It simply scrapes elements and relays messages to the background script, it's intentionally very simple and lightweight.
