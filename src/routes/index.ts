import { Router } from "express";

const routes = Router();

import { productRouter } from "./products.routes";
import { stocksRouter } from "./stocks.routes";

routes.use("/products", productRouter);
routes.use("/stocks", stocksRouter);

export { routes };
