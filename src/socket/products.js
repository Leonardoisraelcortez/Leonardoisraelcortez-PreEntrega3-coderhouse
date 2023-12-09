import ProductRepository from "../repository/productRepository.js";
const prodRepositorySocket = new ProductRepository()

const productEvents = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log('cliente conectado con id', socket.id);

        const listadeproductos = await prodRepositorySocket.getRepository()
        socket.emit("sendproducts", listadeproductos)

        socket.on("addProduct", async (obj) => {
            await prodRepositorySocket.addProduct(obj)
            const updateProducts = await prodRepositorySocket.getRepository()
            socket.emit("sendproducts", updateProducts)
        });
    });
};

export default productEvents;