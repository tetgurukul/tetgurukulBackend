import express from 'express';
import { createProductSubcategory, getProductSubcategories, getProductSubcategoryBySubId, updateProductSubcategory, deleteProductSubcategory } from '../controllers/product.Subcategory.Controller.js';

const router = express.Router();

// Route to create a new product subcategory
router.post('/product-subcategory', createProductSubcategory);

// Route to get all product subcategories
router.get('/product-subcategories', getProductSubcategories);

// Route to get a single product subcategory by ID
router.get('/product-subcategory/:productCategory', getProductSubcategoryBySubId);

// Route to update a product subcategory by ID
router.put('/product-subcategory/:id', updateProductSubcategory);

// Route to delete a product subcategory by ID
router.delete('/product-subcategory/:id', deleteProductSubcategory);

export default router;
