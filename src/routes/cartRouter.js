import { Router } from "express";
import { addCartController, addProductToCartController, deleteProductOfCartController, emptyCartController, getAllCartsController, getCartByIdController, getProductInCartController, updateCartController, updateProductQuantityController } from "../dao/controller/cartController.js";

const router = Router();

router.post('/cart/',addCartController);

router.get('/cart', getAllCartsController);

router.get('/cart/:cid', getCartByIdController);

router.post('/cart/:cid/product/:pid', addProductToCartController);

router.delete('/cart/:cid/product/:pid', deleteProductOfCartController);

router.delete('/cart/:cid', emptyCartController);

router.put('/cart/:cid', updateCartController);

router.put('/cart/:cid/products/:pid', updateProductQuantityController);

export default router;
