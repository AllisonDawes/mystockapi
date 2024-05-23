import { Request, Response } from "express";
import { readFile } from "fs/promises";
import { client } from "../../databases/bd";

/**
 *
 * Buscar produtos pelo nome
 */
export async function findProductsByName(request: Request, response: Response) {
  const { name_product } = request.query;

  const findProductByNameQuery = await readFile(
    "./src/modules/products/query/find_product_by_name.sql",
    "utf-8"
  );

  const products = await client.query(findProductByNameQuery, [
    `%${name_product}%`,
  ]);

  return response.status(200).json(products.rows);
}

/**
 *
 * Criar Produto
 */
export async function createProduct(request: Request, response: Response) {
  const { name_product, category, price } = request.body;

  if (
    name_product.length === 0 ||
    category.length === 0 ||
    price.length === 0
  ) {
    return response.status(400).json({
      message: "Você deve informar nome, categoria e preço do produto!",
    });
  }

  const findExistsProductQuery = await readFile(
    "./src/modules/products/query/find_exists_product.sql",
    "utf-8"
  );

  const productExists = await client.query(findExistsProductQuery, [
    name_product,
  ]);

  if (productExists.rows.length > 0) {
    return response.status(400).json({ message: "Nome do produto ja existe!" });
  }

  const createProductQuery = await readFile(
    "./src/modules/products/query/create_product.sql",
    "utf-8"
  );

  await client.query(createProductQuery, [name_product, category, price]);

  return response.status(201).json({
    message: "Produto cadastrado com sucesso!",
  });
}

/**
 *
 * Atualizar dados do produto
 */
export async function updateProduct(request: Request, response: Response) {
  const { product_id } = request.params;
  const { name_product, category, price } = request.body;

  if (
    name_product.length === 0 ||
    category.length === 0 ||
    price.length === 0
  ) {
    return response.status(400).json({
      message: "Você deve informar nome, categoria e preço do produto!",
    });
  }

  const findExistsProductQuery = await readFile(
    "./src/modules/products/query/find_exists_product.sql",
    "utf-8"
  );

  const productExists = await client.query(findExistsProductQuery, [
    name_product,
  ]);

  if (productExists.rows.length > 0) {
    return response.status(400).json({ message: "Nome do produto ja existe!" });
  }

  const updateProductQuery = await readFile(
    "./src/modules/products/query/update_product.sql",
    "utf-8"
  );

  await client.query(updateProductQuery, [
    name_product,
    category,
    price,
    product_id,
  ]);

  return response
    .status(200)
    .json({ message: "Produto atualizado com sucesso!" });
}

/**
 *
 * Deletar Produto
 */
export async function deleteProduct(request: Request, response: Response) {
  const { product_id } = request.params;

  const deleteProductQuery = await readFile(
    "./src/modules/products/query/delete_product.sql",
    "utf-8"
  );

  await client.query(deleteProductQuery, [product_id]);

  return response
    .status(200)
    .json({ message: "Produto deletado com sucesso!" });
}
