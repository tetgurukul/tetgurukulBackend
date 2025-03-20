//Razorpay routes.

//importing packages.

import express from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/razorpayPayment.controller.js";

const router = express.Router();

router.post("/createorder", createPaymentOrder);
router.post("/verifypayment", verifyPayment);


export default router;