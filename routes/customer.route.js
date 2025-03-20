// Importing packages
import express from "express";

// Importing controllers for handling customer-related requests
import { 
    postCustomer, 
    getCustomers, 
    getCustomerById, 
    putCustomerById, 
    deleteCustomerById, 
    getCustomerByPhone 
} from "../controllers/CustomerController.js";

// Creating express router
const router = express.Router();

// Routes for customer operations
router.post("/postcustomers", postCustomer);  // Create a new customer
router.get("/getcustomers", getCustomers);  // Get all customers
router.get("/getcustomerbyid/:_id", getCustomerById);  // Get a customer by their ObjectId
router.put("/updatecustomerbyid/:_id", putCustomerById);  // Update customer details by ObjectId
router.delete("/deletecustomerbyid/:_id", deleteCustomerById);  // Delete a customer by ObjectId
router.get("/getcustomerbyphone/:phone", getCustomerByPhone);  // Get a customer by phone number

export default router;
