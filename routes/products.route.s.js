//Writing Routes

//Importing packages
import express from "express";

//Importing controller for the routes to routing.
import {createProduct, getProduct, putProduct, deleteProduct, getProductById, categoryOfProduct, subCategoryOfProduct} from "../controllers/products.controller.js";

//Creating express rounter.
const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getProduct", getProduct);
router.put("/putProduct/:_id", putProduct);
router.delete("/deleteProduct/:_id", deleteProduct);
router.get("/getProductById/:_id", getProductById);
router.get("/getProductCategory", categoryOfProduct);
router.get("/getproductsubcategory", subCategoryOfProduct)


export default router;
