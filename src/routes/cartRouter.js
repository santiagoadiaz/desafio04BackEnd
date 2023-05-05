import { Router } from "express";
const router = Router();
import CartManager from "../managers/cartManager.js";
const cartManager = new CartManager();

router.get('/', async (req, res) => {
    try {
        const cartFile = await cartManager.getAllCarts();
        res.status(200).json(cartFile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cartFile = await cartManager.findCartsByIdCart(id);
        if (cartFile) {
            res.status(200).json(cartFile);
        } else {
            res.status(404).send(`cart with id:${id} not found`)
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.generateCart()
        res.status(200).json(newCart)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.post('/:cartId/product/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId
        const productAdded = await cartManager.addProductToCart(cartId, productId)
        if (productAdded) {
            res.status(200).send(`product with id:${productAdded} added successfully`)
        } else {
            res.status(404).send(`product with id:${productId} not found`)
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});
router.delete('/:cartId/product/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId
        const productDeleted = await cartManager.deleteProduct(cartId, productId)
        if (productDeleted) {
            res.status(200).send(`product with id:${productDeleted} deleted successfully`)
        } else {
            res.status(404).send(`product with id:${productId} not found`)
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
export default router