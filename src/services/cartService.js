import CartRepository from "../repository/cartRepository.js";

const cartRepository = new CartRepository();

export default class CartService {
    async getAllCartsService(id) {
        try {
            const carts = await cartRepository.getRepository(id);
            return carts;
        } catch (error) {
            console.log('Error al agregar carrito', error);
        }
    }

    async addCartService(cart) {
        try {
            const newCart = await cartRepository.postRepository(cart);
            return newCart.id;
        } catch (error) {
            console.log('Error al agregar carrito', error);
        }
    }

    async getCartByIdService(cid) {
        try {
            const cart = await cartRepository.getIdRepository({ _id: cid });
            return cart;
        } catch (error) {
            console.log('Error al obtener el ID del carrito', error);
        }
    }

    async getProductInCartService(cid) {
        try {
            const cart = await cartRepository.getRepository(cid);
            if (cart) {
                return cart.products;
            } else {
                console.log('Carrito no encontrado');
                return [];
            }
        } catch (error) {
            console.log('Error al obtener los productos del carrito', error);
        }
    }

    async addProductToCartService(cid, pid, quantity) {
        try {
            const cartFind = await cartRepository.getRepository({ _id: cid });

            if (cartFind !== null) {
                const existingProduct = cartFind.products.findIndex((product) => product._id.toString() === pid);
                
                if (existingProduct !== -1) {
                    cartFind.products[existingProduct].quantity += quantity;
                }else {
                    cartFind.products.push({ pid, quantity });
                }
                await cartRepository.updateRepository({ _id: cid }, { products: cartFind.products });
                console.log('Producto añadido al carrito')
            } else {
                console.log('No se encontro el carrito al que intentas añadir el producto')
            }
        } catch (error) {
            console.log('Error al actualizar el carrito', error);
        }
    }

    async deleteProductOfCartService(cid, pid) {
        try {
            const result = await cartRepository.deleteProductRepository(
                { _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true }
            );
            if (result) {
                console.log('Producto retirado del carrito');
            } else {
                console.log('Producto no encontrado en el carrito');
            }
        } catch (error) {
            console.log('Error al remover el producto del carrito', error);
        }
    }

    async updateCartService(cid, updateData) {
        try {
            const data = await cartRepository.updateRepository({ _id: cid }, updateData)
            return data;
        } catch (error) {
            console.log('Error al actualizar el carrito', error);
        }
    }

    async updateProductQuantityService(cid, pid, quantity) {
        try {
            const cart = await cartRepository.getRepository(cid);
            if (!cart) {
                console.log("Carrito no encontrado");
            }
            const productToUpdate = cart.products.find(
                (product) => product._id.toString() === pid
            );
            if (!productToUpdate) {
                console.log("Producto no encontrado en el carrito");
            }
            productToUpdate.quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            console.log('Error al actualizar el producto del carrito', error);
        }
    }

    async emptyCartService(cid, pid) {
        try {
            const cart = await cartRepository.deleteProductRepository(cid, pid);
        } catch (error) {
            console.log('Error al vaciar el carrito', error);
        }
    }
}