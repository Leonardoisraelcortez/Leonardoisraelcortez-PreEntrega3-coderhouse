import { Router } from "express";
import productsService from "../services/productsService.js";
import CartService from "../services/cartService.js";
import publicRoutes from "../middlewares/publicRoutes.js";
import privateRoutes from "../middlewares/privateRoutes.js"


const router = Router();
const productService = new productsService();

const cartService = new CartService();

router.get('/', async (req, res) => {
    const products = await productService.getProductsService();
    res.render('home', {products});
});

router.get('/realtimeproducts', (req, res)=> {
    res.render('realtimeproducts')
})

router.get('/chat', (req, res)=> {
    res.render('chat', {})
});

router.get('/products', privateRoutes, async (req,res)=> {
    const products = await productService.getProductsService();
    const { first_name } = req.session;
    res.render('products', { first_name, products})

});

router.get('/mockingproducts', publicRoutes, async (req,res)=> {
    const products = await productService.getFakerService();
    res.render('products', {products});
})

router.get('/cart', async (req,res)=> {
    const cart = await cartService.getAllCartsService();
    res.render('cart', {cart})
});

router.get('/signup', publicRoutes, (req, res)=> {
    res.render('signup')
});

router.get('/failregister', publicRoutes, (req, res)=> {
    res.render('failregister')
});

router.get('/login', publicRoutes, (req, res)=> {
    res.render('login')
});

router.get('/profile', privateRoutes, (req, res) => {
    const { first_name, last_name, role, email, age } = req.session;
    res.render('profile', { first_name, last_name, role, email, age})
});

router.get('/logout', (req,res )=> {
    req.session.destroy();
    res.redirect('/login');
});


export default router;
