// routes/finalProduct.route.js
import express from 'express';
import { createFinalProduct, getFinalProducts, getFinalProductById, updateFinalProduct, deleteFinalProduct } from '../controllers/finalProduct.controller.js';

const router = express.Router();

// POST route to create a final product
router.post('/final-product', createFinalProduct);

// GET route to fetch all final products
router.get('/final-products', getFinalProducts);

// GET route to fetch a specific final product by ID
router.get('/final-product/:productSubCategory', getFinalProductById);

// PUT route to update a final product by ID
router.put('/final-product/:id', updateFinalProduct);

// DELETE route to delete a final product by ID
router.delete('/final-product/:id', deleteFinalProduct);

export default router;
