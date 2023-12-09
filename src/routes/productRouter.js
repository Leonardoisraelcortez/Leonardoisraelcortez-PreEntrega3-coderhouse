import { Router } from "express";
import {addProductController, deleteProductsController, getFakerController, getProductsByIdController, pageProductsController, updateProductsController} from "../dao/controller/productController.js"
const router = Router();

router.get('/products/', pageProductsController);

router.get('/products/:pid', getProductsByIdController);

router.post('/products/', addProductController);

router.put('/products/:pid', updateProductsController);

router.delete('/products/:pid', deleteProductsController);

router.get('/mockingproducts', getFakerController);

export default router;
