import { Router } from "express";

import {
  findProductsByName,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../modules/products/productsControllers";

const productRouter = Router();

productRouter.get("/", findProductsByName);
productRouter.post("/", createProduct);
productRouter.put("/:product_id", updateProduct);
productRouter.delete("/:product_id", deleteProduct);

export { productRouter };
