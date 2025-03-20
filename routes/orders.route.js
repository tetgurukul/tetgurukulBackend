//Writing Routes for order.controller.js

//Importing packages
import express from "express";

//Importing controller for the routers to routing to it's conrollers.
import { postOrder, getOrder, getOrderById, putOrderById, deleteOrderById, getOrderByOrderId, getOrderByPhoneNumber, updatePaymentStatus  } from "../controllers/order.controller.js";

//Creating express router.
const router = express.Router();

router.post("/createorder", postOrder);
router.get("/getorder", getOrder );
router.get("/getorderbyid/:_id", getOrderById);
router.put("/putorderbyid/:_id", putOrderById);
router.delete("/deleteorderbyid/:_id", deleteOrderById);
router.get("/getOrdersByOrderId/:orderId", getOrderByOrderId);
router.get("/getOrderByPhoneNumber/:phone", getOrderByPhoneNumber)
router.put("/updatePaymentStatus/:_id", updatePaymentStatus )

export default router;