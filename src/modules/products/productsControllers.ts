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

  try {
    const findProductsQuery = await readFile(
      "./src/modules/products/query/find_products.sql",
      "utf-8"
    );

    const findProducts = await client.query(findProductsQuery);

    const productExists = findProducts.rows.find((item) => {
      return item.name_product === name_product;
    });

    if (productExists) {
      return response
        .status(400)
        .json({ message: "Nome do produto ja existe!" });
    }

    const createProductQuery = await readFile(
      "./src/modules/products/query/create_product.sql",
      "utf-8"
    );

    await client.query(createProductQuery, [name_product, category, price]);

    return response.status(201).json({
      message: "Produto cadastrado com sucesso!",
    });
  } catch (err) {
    return response
      .status(400)
      .json({ message: "Erro ao cadastrar produto.", err });
  }
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

  try {
    const findExistsProductQuery = await readFile(
      "./src/modules/products/query/find_others_products.sql",
      "utf-8"
    );

    const findProductsById = await client.query(findExistsProductQuery, [
      product_id,
    ]);

    const productExists = findProductsById.rows.find((item) => {
      return item.name_product === name_product;
    });

    if (productExists) {
      return response
        .status(400)
        .json({ message: "Nome do produto ja existe!" });
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
  } catch (err) {
    return response
      .status(400)
      .json({ message: "Erro ao cadastrar produto.", err });
  }
}

/**
 *
 * Deletar Produto
 */
export async function deleteProduct(request: Request, response: Response) {
  const { product_id } = request.params;

  try {
    const deleteProductQuery = await readFile(
      "./src/modules/products/query/delete_product.sql",
      "utf-8"
    );

    await client.query(deleteProductQuery, [product_id]);

    return response
      .status(200)
      .json({ message: "Produto deletado com sucesso!" });
  } catch (err) {
    return response
      .status(400)
      .json({ message: "Erro ao cadastrar produto.", err });
  }
}
