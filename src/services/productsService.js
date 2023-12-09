import mongoose from "mongoose";
import ProductRepository from '../repository/productRepository.js';

const productRepository = new ProductRepository();

export default class productsService {
    async addProductService(title, description, category, price, thumbnail, code, stock) {
        const newProduct = {
            title,
            description,
            category,
            price,
            thumbnail,
            code,
            stock,
        };

        const repeatCode = await productRepository.getRepository({ code: code });
        if (repeatCode.length > 0) {
            console.log("Repetir")
            return;
        }
        try {
            const productCreate = await productRepository.postRepository(newProduct);
            return productCreate;
        } catch (error) {
            console.log("Error al agregar un producto", error)
        }
    }

    async getProductsService() {
        const data = await productRepository.getRepository();
        return data;
    }

    async getProductsByIdService(pid) {
        try {
            console.log("Valor de pid:", pid);
            const objectId = new mongoose.Types.ObjectId(pid);
            const data = await productRepository.getRepository({ _id: objectId });
            return data;
        } catch (error) {
            console.error("Error en id:", error);
        }
    }

    async deleteProductsService(pid) {
        try {
            const data = await productRepository.deleteRepository({ _id: pid });
            return data;
        } catch (error) {
            console.log("Error al borrar un producto", error)
        }
    }

    async updateProductsService(pid, updateData) {
        try {
            const data = await productRepository.updateRepository({ _id: pid }, updateData);
            return data;
        } catch (error) {
            console.log("Error actualizando un producto", error)
        }
    }

    async pageProductsService(modelQuery, modelLimit, modelPage, modelSort) {
        try {
            const page = await productRepository.pageRepository(modelQuery, modelLimit, modelPage, modelSort);
            return page;

        } catch (error) {
            console.error("Error en pageProducts:", error);
            throw error;
        }
    }

    async getFakerService() {
        try {
            let products = [];
            for(let i = 0; i < 100; i++){
                let product = await productRepository.getFaker()
                products.push(product)
            }
            return products;
        } catch (error) {
            console.error("Error en getFake:", error);
        }
    }
}
