// controllers/price.controller.js
import { Price } from "../models/price.Model.js";

// Create a new Price entry (POST request)
export const createPrice = async (req, res) => {
  try {
    const {
      productId,
      costPrice,
      salePrice,
      tax,
      gst,
      shippingCharges,
      deliveryCharges,
      discountPercentage
    } = req.body;

    // Create a new price entry
    const newPrice = new Price({
      productId,
      costPrice,
      salePrice,
      tax,
      gst,
      shippingCharges,
      deliveryCharges,
      discountPercentage
    });

    // Save the price entry to the database
    await newPrice.save();

    res.status(201).json({ status: "success", data: newPrice });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get all Price entries (GET request)
export const getPrices = async (req, res) => {
  try {
    const prices = await Price.find(); //.populate('productId')
    res.status(200).json({ status: "success", data: prices });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get Price entry by Product ID (GET request)
export const getPriceByProductId = async (req, res) => {

    const {productId} = req.params;

    console.log(productId)
  try {
    const price = await Price.find({ productId: productId }); //.populate('productId')
    if (!price) {
      return res.status(404).json({ status: "fail", message: "Price not found for the product" });
    }
    res.status(200).json({ status: "success", data: price });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update Price entry by Product ID (PUT request)
export const updatePrice = async (req, res) => {
  try {
    const price = await Price.findOneAndUpdate({ productId: req.params.productId }, req.body, { new: true });
    if (!price) {
      return res.status(404).json({ status: "fail", message: "Price not found for the product" });
    }
    res.status(200).json({ status: "success", data: price });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete Price entry by Product ID (DELETE request)
export const deletePrice = async (req, res) => {
  try {
    const price = await Price.findOneAndDelete({ productId: req.params.productId });
    if (!price) {
      return res.status(404).json({ status: "fail", message: "Price not found for the product" });
    }
    res.status(200).json({ status: "success", message: "Price deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
