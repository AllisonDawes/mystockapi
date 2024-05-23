import { Router } from "express";

import {
  findStockProductsById,
  findStockProductsByName,
  createStock,
  updateStock,
  deleteStock,
} from "../modules/stocks/stocksController";

const stocksRouter = Router();

stocksRouter.get("/:product_id", findStockProductsById);
stocksRouter.get("/", findStockProductsByName);
stocksRouter.post("/:product_id", createStock);
stocksRouter.put("/:product_id/update", updateStock);
stocksRouter.delete("/:product_id/delete", deleteStock);

export { stocksRouter };
