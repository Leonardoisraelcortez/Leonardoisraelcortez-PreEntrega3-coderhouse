import productsService from "../../services/productsService.js";

const productService = new productsService();

export const pageProductsController = async (req, res, next) => {
    try {
        const { limit, page, sort, query } = req.query;

        const sortObject = {
            asc: { price: 1 },
            desc: { price: -1 },
        };

        const modelQuery = query ? JSON.parse(query) : {};
        const modelLimit = limit ? parseInt(limit, 10) : 10;
        const modelPage = page ? parseInt(page, 10) : 1;
        const modelSort = sortObject[sort] ?? undefined;

        const product = await productService.pageProductsService(modelQuery, modelLimit, modelPage, modelSort);
        res.send(product)
    } catch (error) {
        res.status(500).send("Error al mostrar los productos");
        next(error);
    }
}

export const getProductsByIdController = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const prod = await productService.getProductsByIdService(pid);

        if (prod) {
            res.send(prod)
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send("Error al filtrar por ID");
        next(error)
    }
}

export const addProductController = async (req, res, next) => {
    const { title, description, category, price, thumbnail, code, stock } = req.body;

    if (productService) {
        try {
            const newProduct = await productService.addProductService(title, description, category, price, thumbnail, code, stock);
            res.send(newProduct);
        } catch (error) {
            res.status(500).send("Error al añadir producto");
            next(error)
        }
    } else {
        res.status(400).send("Peticion incompleta");
    }
}

export const updateProductsController = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const update = req.body;

        await productService.updateProductsService(pid, update);

        res.send('Actualizado de forma exitosa')
    } catch (error) {
        res.status(500).send("Error al añadir producto");
        next(error)
    }
}

export const getProductsController = async () => {
    return await productService.getProductsService();
}


export const deleteProductsController = async (req, res, next) => {
    try{
        const pid = req.params.pid;
        await productService.deleteProductsService(pid);
        res.send('Borrar producto')
    }catch(error){
        res.status(500).send("Error al agregar producto");
        next(error)
    }
}


export const getFakerController = async (req, res, next) => {
        try {
            const product = await productService.getFakerService();
            res.send(product);
        } catch (error) {
            res.status(500).send("Error al obtener producto");
            next(error)
        }
}




