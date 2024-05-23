import { readFile } from "fs/promises";
import { client } from "./bd";

export async function createTables() {
  try {
    const createTablesSQL = await readFile(
      "./src/databases/tables/create/create_tables.sql",
      "utf-8"
    );

    await client.query(createTablesSQL);

    console.log("Tabelas criadas com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabelas!\n\n", err);
  }
}

client
  .connect()
  .then(createTables)
  .catch((err: string) => {
    console.error("Erro ao conectar com a base de dados!\n\n", err);
  });
