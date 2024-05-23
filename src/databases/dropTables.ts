import { readFile } from "fs/promises";
import { client } from "./bd";

export async function createTables() {
  try {
    const dropTablesSQL = await readFile(
      "./src/databases/tables/drop/drop_tables.sql",
      "utf-8"
    );

    await client.query(dropTablesSQL);

    console.log("Tabelas deletadas com sucesso!");
  } catch (err) {
    console.error("Erro ao deletar tabelas!\n\n", err);
  }
}

client
  .connect()
  .then(createTables)
  .catch((err: string) => {
    console.error("Erro ao conectar com a base de dados!\n\n", err);
  });
