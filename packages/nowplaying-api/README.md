# nowplaying-api

The backend API powering [soundcloud.aidenwallis.co.uk](https://soundcloud.aidenwallis.co.uk). Written in [Fastify](https://fastify.io/) and [TypeScript](https://typescriptlang.org).

## Prerequisites

- [Node.js](https://nodejs.org/en/) v10 or later on your system.
- [MongoDB 4.2](https://www.mongodb.com/) or later installed on your system.
- [Redis](https://redis.io/) installed on your system.

## Infrastructure

The API is broken down into individual controllers belonging to their own plugin context in Fastify. This helps to encapsulate controller behaviour and allow you to, in a more modular way, potentially import other routes into different APIs, if we ever shared API compnoents across different versions.

Controllers are simply typescript module files exporting a function (and potentially) an interface per route. Interfaces should be used if your endpoint requires any parameter in the request (ie headers, query strings, body, path params, etc).
