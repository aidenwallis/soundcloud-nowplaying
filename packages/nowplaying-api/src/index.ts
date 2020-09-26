import * as mongoose from "mongoose";
import {config} from "./config";
import {Server} from "./server";
import * as log from "./util/log";

const server = new Server();

async function start() {
  await mongoose.connect(config.mongodb.url);
  await server.start(7777);
  log.info("SoundCloud Now Playing started on port 7777");
}

async function close() {
  await server.close();
}

process.on("SIGTERM", close);
process.on("SIGINT", close);

start();
