import fastify from "fastify";
import cookie from "fastify-cookie";
import cors from "fastify-cors";
import * as v1 from "./public/v1";

export class Server {
  private fastify = fastify();

  public constructor() {
    this.fastify.register(cors);
    this.fastify.register(cookie);
    this.fastify.register(v1.register, {prefix: "/v1"});
  }

  public async start(port: number) {
    await this.fastify.listen(port);
  }

  public close() {
    return this.fastify.close();
  }
}
