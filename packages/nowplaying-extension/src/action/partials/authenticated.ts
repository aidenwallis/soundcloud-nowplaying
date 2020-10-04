import {LOGO_PARTIAL} from "./logo";

export const AUTHENTICATED_TEMPLATE = `
  <div class="container">
    <div class="logo-container">
      ${LOGO_PARTIAL}
    </div>
    <h1 class="title">Good to go!</h1>
    <p>The extension has been configured correctly and is sending your SoundCloud activity to the system.</p>
    <a href="#" id="sign-out" class="sign-out">Sign out</a>
  </div>
`;
