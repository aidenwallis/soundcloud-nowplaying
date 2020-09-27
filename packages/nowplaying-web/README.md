# nowplaying-web

The react web app powering [soundcloud.aidenwallis.co.uk](https://soundcloud.aidenwallis.co.uk). This is a react single page app written in Typescript.

The frontend is hosted on Netlify.

## Setup

1. Clone/fork the repository
1. Make a copy of the `.env.example` file and move it to `.env` (ie, for terminal users, you can run `cp .env.example .env` within the project directory).
1. Run `yarn` to install all dependencies.
1. Start the web server with `yarn start`.

## Development guide

- Each component should live in it's own directory, have an `index.ts` file which points to either a container file, named `container.tsx` within the directory, or the component file if a container is not required, which should be named `component.tsx`.
- Any interactions with the redux store/outside the scope of the UI (ie, it's safe to handle click events within the component scope) should live inside the `container.tsx` file. This is to ensure only UI and UI events are handled within our presentational components.
- Avoid HoC, despite the `container -> component` architecture being somewhat similar to HoC, we still compose with hooks. Unless it's necessary to use a class, please stick to using React hooks.
- Please consider whether it's possible before installing another npm dependency to rebuild it without too much work without requiring yet another dependency, it's important to keep bundle sizes low.
- Spacing, sizing, color or anything related to layout of that sort should be composed with the built in theme properties, such as `theme.spacing()`, `theme.typography` or `theme.palette`. Please stick as close to the core material UI theme helpers/style rules as possible.
