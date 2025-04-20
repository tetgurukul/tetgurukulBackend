import express from 'express';
import { createProductCategory, getProductCategories, getProductCategoryByProductId, updateProductCategory, deleteProductCategory } from '../controllers/product.Category.Controller.js';

const router = express.Router();

// Routes for product categories
router.post('/product-category', createProductCategory); // Create new category
router.get('/product-categories', getProductCategories); // Get all categories
router.get('/product-category/:productCategoryId', getProductCategoryByProductId); // Get single category
router.put('/product-category/:productCategoryId', updateProductCategory); // Update category
router.delete('/product-category/:id', deleteProductCategory); // Delete category

export default router;
