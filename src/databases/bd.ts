import "dotenv/config";

import { Client } from "pg";

export const client = new Client({
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB),
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.DATABASE_DB,
});
