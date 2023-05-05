import { Router } from "express";
const router = Router();
import ProductManager from "../managers/productsManager.js";
const productsManager = new ProductManager();
import { productPropValidator } from "../middlewares/productPropValidator.js";

router.get('/', async(req, res)=>{
    try {
        const productsFile = await productsManager.getProducts()
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        if(limit){
            const limitedProducts = productsFile.slice(0, limit);
            const remainingProducts = productsFile.slice(limit); 
            res.status(200).json({limitedProducts, remainingProducts});
        } else{
            res.status(200).json(productsFile);
        };
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});
router.post('/', productPropValidator, async(req, res)=>{
    try {
        const product = req.body;
        const addedProduct = await productsManager.createProducts(product);
        res.status(200).json(addedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});
router.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const productFound = await productsManager.findProductByIdProducts(id);
        if(productFound){
            res.status(200).json({productFound})
        }else{
            res.status(404).send('product not found')
        };
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});
router.put('/:id', async(req, res) => {
    try {
        const { key, value } = req.body;
        // Debe enviarse asi desde el body = {
        //     "key": "price",
        //     "value": 6000
        // }
        const { id } = req.params;
        const productFound = await productsManager.findProductByIdProducts(id);
        if(productFound){
            await productsManager.updateProduct(id, key, value );
            res.send(`product updated successfully!`);
        } else {
            res.status(404).send('product not found')
        };
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});
router.delete('/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const productToRemove = await productsManager.deleteProduct(id);
        if(productToRemove){
            res.status(200).send(`product with id:${productToRemove} removed successfully`)
        }else{
            res.status(404).send('product not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});
router.delete('/', async(req, res)=>{
    try {
        const deleteAllProducts = await productsManager.deleteAll();
        if(deleteAllProducts){
            res.status(200).send(`products in path ${deleteAllProducts} deleted successfully`)
        }else{
            res.status(404).send('path does not exist')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
export default router