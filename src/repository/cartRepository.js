import cartModel from "../dao/models/cart.model.js";

export default class CartRepository {

    async getRepository() {
        try {
            const get = await cartModel.find({}).lean();
            return get;
        } catch (error) {
            console.error("Error al tomar los carritos", error);
            throw error;
        }
    }

    async getIdRepository(cid){
        try {
            const getId = await cartModel.find(cid).lean();
            return getId;
        } catch (error) {
            console.error("Error al tomar los carritos por id", error);
            throw error;
        }
    }

    async postRepository(cart) {
        try {
            const add = await cartModel.create(cart);
            return add;
        } catch (error) {
            console.error("Error al añadir carrito", error);
            throw error;
        }
    }

    async updateRepository(cid, updateData) {
        try {
            const data = await cartModel.updateOne(cid, updateData);
            return data;
        } catch (error) {
            console.error("Error al actualizar carrito", error);
            throw error;
        }
    }

    async deleteProductRepository(cid,pid){
        try {
            const data = await cartModel.findOneAndUpdate(cid, pid);
            return data;
        } catch (error) {
            console.error("Error al borrar producto", error);
            throw error;
        }
    }
}