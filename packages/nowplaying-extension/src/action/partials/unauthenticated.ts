import {LOGO_PARTIAL} from "./logo";

export const UNAUTHENICATED_TEMPLATE = `
  <div class="container">
    <div class="logo-container">
      ${LOGO_PARTIAL}
    </div>
    <h1 class="title">Link your account</h1>
    <p>In order for the system to start tracking your SoundCloud activity, you need to log in through the extension so that your accounts are linked.</p>
    <button id="login-button" class="login-button">Login with Twitch</button>
  </div>
`;
