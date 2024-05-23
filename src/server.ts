import express, { Request, Response } from "express";
import helmet from "helmet";

import { client } from "./databases/bd";

import { routes } from "./routes";

const server = express();

server.use(helmet());
server.use(express.json());
server.use(routes);

server.get("/test", (request: Request, response: Response) => {
  return response.status(200).json({ message: "server online." });
});

client
  .connect()
  .then(() => {
    server.listen(3333, () => {
      console.log("server runing on port 3333.");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados!", err);
  });
