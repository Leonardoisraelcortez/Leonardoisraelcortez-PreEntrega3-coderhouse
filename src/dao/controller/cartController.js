import CartService from "../../services/cartService.js";
import productsService from "../../services/productsService.js";

const cartService = new CartService();
const productService = new productsService();

export const addCartController = async (req, res, next) => {
    try {
        const cart = { products: [] };
        const cartId = await cartService.addCartService(cart);
        res.status(201).json({ message: 'Carrito creado exitosamente', cartId });
    } catch (error) {
        console.error('Error al crear el carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        next(error);
    }
}

export const getAllCartsController = async (req, res, next) => {
    try {
        const allCarts = await cartService.getAllCartsService();
        res.json(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const products = await cartService.getCartByIdService(cartId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        next(error);
    }
}

export const getProductInCartController = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const products = await cartService.getProductInCartService(cartId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        next(error);
    }
}

export const addProductToCartController = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;

        if (quantity <= 0) {
            return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
        }

        const cart = await cartService.getCartByIdService(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        const product = await productService.getProductsByIdService(pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await cartService.addProductToCartService(cid, pid, quantity);
        res.json({ message: 'Producto agregado al carrito con exito' });

    } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        next(error);
    }
}

export const deleteProductOfCartController = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
    
        await cartService.deleteProductOfCartService(cid, pid);

        res.json({ message: 'Producto retirado del carrito' });
    } catch (error) {
        console.error('Error al borrar el producto del carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        next(error)
    }
}

export const updateCartController = async (req, res, next) => {
    try{
        const cid = req.params.cid;
        const updateData = req.body;

        await cartService.updateCartService(cid, updateData);
        res.send('Actualizado correctamente')
    }catch(error){
        console.error('Error al actulizar el carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        next(error);
    }
}

export const updateProductQuantityController = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
    
        const cart = await cartService.getCartByIdService(cid);
    
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
    
        const product = await productService.getProductsByIdService(pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }console.log();
    
        await cartService.updateProductQuantityService(cid, pid, quantity);
        console.log(quantity);
        res.json({ message: 'Cantidad de productos modificada', productId: pid, cartId: cid });
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        next(error);
    }
}

export const emptyCartController = async (req, res, next) => {
    try{
        const cid = req.params.cid;
    
        await cartService.emptyCartService(cid); 
        res.send('Actualizacion exitosa');
        
        }catch(error){
            console.error('Error al borrar carrito', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            next(error)
        }
}
