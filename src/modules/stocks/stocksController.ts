import { Request, Response } from "express";
import { readFile } from "fs/promises";
import { client } from "../../databases/bd";

/**
 *
 * Buscar Estoque Pelo Id do Produto
 */
export async function findStockProductsById(
  request: Request,
  response: Response
) {
  const { product_id } = request.params;

  const findStockByProductsIdQuery = await readFile(
    "./src/modules/stocks/query/find_stock_by_product_id.sql",
    "utf-8"
  );

  const stockProducts = await client.query(findStockByProductsIdQuery, [
    product_id,
  ]);

  return response.status(200).json(stockProducts.rows);
}

/**
 *
 * Buscar Estoque Pelo Nome do Produto
 * retornando o total do estoque.
 */
export async function findStockProductsByName(
  request: Request,
  response: Response
) {
  const { name_product } = request.query;
  const { initial_date, final_date } = request.body;

  const findStockProductsByNameQuery = await readFile(
    "./src/modules/stocks/query/find_stock_products_by_name.sql",
    "utf-8"
  );

  const stockProducts = await client.query(findStockProductsByNameQuery, [
    `%${name_product}%`,
    initial_date,
    final_date,
  ]);

  return response.status(200).json(stockProducts.rows);
}

/**
 *
 * Criar Estoque de Produto
 */
export async function createStock(request: Request, response: Response) {
  const { product_id } = request.params;
  const { quantity, type } = request.body;

  const createStockQuery = await readFile(
    "./src/modules/stocks/query/create_stock_product.sql",
    "utf-8"
  );

  await client.query(createStockQuery, [quantity, type, product_id]);

  if (type === "output") {
    return response
      .status(201)
      .json({ message: "Saída de produto realizada com sucesso!" });
  }

  return response
    .status(201)
    .json({ message: "Entrada de produto realizada com sucesso!" });
}

/**
 *
 * Atualizar dados do estoque
 */
interface IRequest {
  quantity: number;
  type: "input" | "output";
}

export async function updateStock(request: Request, response: Response) {
  const { product_id } = request.params;
  const { quantity, type } = request.body as IRequest;

  if (quantity < 0 || type.length < 1) {
    return response.status(400).json({
      message: "Informe corretamente a quantidade e o tipo de movimentação.",
    });
  }

  try {
    const stockProduct = await readFile(
      "./src/modules/stocks/query/update_stock_product.sql",
      "utf-8"
    );

    await client.query(stockProduct, [quantity, type, product_id]);

    return response
      .status(200)
      .json({ message: "Estoque atualizado com sucesso!" });
  } catch (err) {
    return response
      .status(400)
      .json({ message: "Erro ao atualizar os dados.", err });
  }
}

/**
 *
 * Deletar registro do estoque
 */
export async function deleteStock(request: Request, response: Response) {
  const { product_id } = request.params;

  const findStockProductQuery = await readFile(
    "./src/modules/stocks/query/find_stock_by_id.sql",
    "utf-8"
  );

  const findStockExists = await client.query(findStockProductQuery, [
    product_id,
  ]);

  if (findStockExists.rows.length < 1) {
    return response
      .status(400)
      .json({ message: "Dados do estoque informado não foram encontrados." });
  }

  try {
    const stockProduct = await readFile(
      "./src/modules/stocks/query/delete_stock_product.sql",
      "utf-8"
    );

    await client.query(stockProduct, [product_id]);

    return response
      .status(200)
      .json({ message: "Estoque deletado com sucesso!" });
  } catch (err) {
    return response
      .status(400)
      .json({ message: "Erro ao deletar os dados.", err });
  }
}