import express, { Request, Response } from 'express';
import { Product } from '../models/Product';

export const productRouter = express.Router();

// Route to get all products
productRouter.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get a product by SKU
productRouter.get('/:sku', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.sku);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add more routes as needed...