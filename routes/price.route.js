// routes/price.route.js
import express from "express";
import { createPrice, getPrices, getPriceByProductId, updatePrice, deletePrice } from "../controllers/price.Controller.js";

const router = express.Router();

// POST route to create a new price entry
router.post("/price", createPrice);

// GET route to fetch all price entries
router.get("/prices", getPrices);

// GET route to fetch a price entry by productId
router.get("/price/:productId", getPriceByProductId);

// PUT route to update price entry by productId
router.put("/price/:productId", updatePrice);

// DELETE route to delete a price entry by productId
router.delete("/price/:productId", deletePrice);

export default router;
