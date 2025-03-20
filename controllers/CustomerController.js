// Importing necessary packages
import express from "express";
import { Customer } from "../models/CustomerModel.js";

// API to create a new customer
export const postCustomer = async (req, res) => {
    console.log("Incoming Customer Data:", req.body);
    
    const { name, email, phone, whatsapp, password } = req.body;
    
    try {
        const customer = await Customer.create({ name, email, phone, whatsapp, password });
        res.status(200).json({ status: "success", data: customer });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
    }
};

// API to get all customers
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json({ status: "Success", data: customers });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
    }
};

// API to get a customer by ID
export const getCustomerById = async (req, res) => {
    const { _id } = req.params;
    
    try {
        const customer = await Customer.findById(_id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json({ status: "Success", data: customer });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
    }
};

// API to update customer details by ID
export const putCustomerById = async (req, res) => {
    const { _id } = req.params;
    const { name, email, phone, whatsapp, password } = req.body;
    
    try {
        const customer = await Customer.findById(_id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        
        customer.name = name || customer.name;
        customer.email = email || customer.email;
        customer.phone = phone || customer.phone;
        customer.whatsapp = whatsapp || customer.whatsapp;
        customer.password = password || customer.password;
        
        const updatedCustomer = await customer.save();
        res.status(200).json({ status: "Success", message: "Data updated successfully", data: updatedCustomer });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
    }
};

// API to delete a customer by ID
export const deleteCustomerById = async (req, res) => {
    const { _id } = req.params;
    
    try {
        const customer = await Customer.findById(_id);
        if (!customer) return res.status(404).json({ status: "Failed", message: "Customer not found" });
        
        await Customer.deleteOne({ _id });
        res.status(200).json({ status: "Success", message: "Customer deleted successfully!" });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
    }
};

// API to get customer details by phone number (useful for authentication)
export const getCustomerByPhone = async (req, res) => {
    const { phone } = req.params;
    
    try {
        const customer = await Customer.findOne({ phone });
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json({ status: "Success", data: customer });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
    }
};
