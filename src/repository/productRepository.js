import productsModel from "../dao/models/product.model.js";
import { fakerES as faker, ka_GE} from '@faker-js/faker'

export default class ProductRepository {
    async getRepository(pid, code) {
        try {
            const get = productsModel.find(pid, code).lean();
            return get;
        } catch (error) {
            console.error("Error al tomar los productos", error);
            throw error;
        }
    }

    async postRepository(product) {
        try {
            const add = await productsModel.create(product);
            return add;
        } catch (error) {
            console.error("Error al filtrar por id", error);
            throw error;
        }
    }

    async deleteRepository(pid) {
        try {
            const get = await productsModel.deleteOne({ _id: pid });
            return get;
        } catch (error) {
            console.error("Error al borrar con id", error);
            throw error;
        }
    }

    async updateRepository(pid, updateData) {
        try {
            const data = await productsModel.updateOne({ _id: pid }, updateData);
            return data;
        } catch (error) {
            console.log("Error al actualizar el producto", error)
        }
    }

    async pageRepository(modelQuery, modelLimit, modelPage, modelSort) {
        try {
            const products = await productsModel.paginate(modelQuery,
                {
                    limit: modelLimit,
                    page: modelPage,
                    sort: modelSort,
                    lean: true,
                }
            );
    
            const response = {
                status: 'success',
                payload: products.docs,
                totalDocs: products.totalDocs,
                limit: products.limit,
                totalPages: products.totalPages,
                page: products.page,
                pagingCounter: products.pagingCounter,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
            };
            return response;

        } catch (error) {
            console.error("Error pageProducts:", error);
            throw error;
        }
    }

    async getFaker(){
        try{
            const products = {
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                category: faker.commerce.department(),
                price: faker.commerce.price(),
                thumbhail: "no-image",
                code: faker.commerce.isbn(),
                stock: faker.number.octal(),
                _id: faker.number.int({ min: 1000000 })
            };
            return products;
        }catch(error){
            console.error("Error", error);
            throw error;
        }
    }
}
