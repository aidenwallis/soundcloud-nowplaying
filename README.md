# SoundCloud Now Playing

SoundCloud Now Playing monorepo.

## Packages

- [nowplaying-api](https://github.com/aidenwallis/soundcloud-nowplaying/tree/master/packages/nowplaying-api) :: The API powering the nowplaying website.
- [nowplaying-web](https://github.com/aidenwallis/soundcloud-nowplaying/tree/master/packages/nowplaying-web) :: The frontend Angular app powering the website.
- [ws-edge](https://github.com/aidenwallis/soundcloud-nowplaying/tree/master/packages/ws-edge) :: The WebSocket edge service end users connect to.

## Setup

This project uses [eslint](https://eslint.org/) and is installed locally into this package. You should also ensure your editor is appropriately formatting your code with [prettier](https://prettier.io/). I would personally recommend using [Visual Studio Code](https://code.visualstudio.com/) while working on this project, as it contains some editor specific configuration for things like auto formatting on save, etc. Note that `.vscode` or any editor-specific directory should not contain anything too opinionated in terms of formatting rules - these should live within eslint/prettier if at all possible, else, should live within `.editorconfig`.

Your editor should also respect the `.editorconfig` file present in this repository. You can find out about editorconfig [here](https://editorconfig.org/). It helps to enforce some basic formatting editor settings in a more agnostic manner.
