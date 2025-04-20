// Importing required packages
import express from "express";
import multer from "multer";

// Interacts with local file path system (using node.js)
import path from "path";
import { fileURLToPath } from "url";  // Import fileURLToPath to handle ES modules

// Importing models
import { ProductSubcategory } from "../models/product.Subcategory.Model.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

// Multer configuration to store files in the local file path public/temp
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Multer configuration to store files in /public/temp folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/temp');
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName);
  }
});

// Multer instance for single image only (productSubImage)
const upload = multer({ storage }).single("productSubImage");

// Controller to create product subcategory
export const createProductSubcategory = async (req, res) => {
  console.log('Entered create product subcategory function');
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "File upload error" });

    // Destructuring the data from req.body to post it into DB
    const { productCategory, productSubCategoryId, productSubName, aboutProductSubcategory, descriptionProductSubcategory, status } = req.body;

    try {
      let productSubImage = "";
      if (req.file) {
        // Uploading image to Cloudinary
        productSubImage = await uploadToCloudinary(req.file);
      }

      // Create the product subcategory in the database
      const productSubcategory = await ProductSubcategory.create({
        productCategory, productSubCategoryId, productSubName, productSubImage, aboutProductSubcategory, descriptionProductSubcategory, status
      });

      res.status(201).json({ status: "success", data: productSubcategory });
    } catch (error) {
      res.status(500).json({ status: "Server error", message: error.message });
    }
  });
};

// API to get all product subcategories
export const getProductSubcategories = async (req, res) => {
  try {
    const subcategories = await ProductSubcategory.find();
    res.status(200).json({ status: "success", data: subcategories });
  } catch (error) {
    res.status(500).json({ status: "Server error", message: error.message });
  }
};

// API to get a single product subcategory by ID
export const getProductSubcategoryBySubId = async (req, res) => {
    const {productCategory} = req.params
    console.log(productCategory)
  try {
    const subcategory = await ProductSubcategory.find({productCategory:productCategory});
    if (!subcategory) {
      return res.status(404).json({ status: "fail", message: "Subcategory not found" });
    }
    res.status(200).json({ status: "success", data: subcategory });
    console.log(subcategory)
  } catch (error) {
    res.status(500).json({ status: "Server error", message: error.message });
  }
};










// API to update product subcategory


// export const updateProductSubcategory = async (req, res) => {
//   try {
//     const subcategory = await ProductSubcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!subcategory) {
//       return res.status(404).json({ status: "fail", message: "Subcategory not found" });
//     }
//     res.status(200).json({ status: "success", data: subcategory });
//   } catch (error) {
//     res.status(500).json({ status: "Server error", message: error.message });
//   }
// };





























// API for updating product subcategory
export const updateProductSubcategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: 'File upload error' });

    const { productSubCategoryId } = req.params;
    const {
      productCategory,
      productSubName,
      aboutProductSubcategory,
      descriptionProductSubcategory,
      status,
    } = req.body;

    console.log(req.params);
    console.log(req.body);

    try {
      let updatedFields = {
        productCategory,
        productSubName,
        aboutProductSubcategory,
        descriptionProductSubcategory,
        status,
      };

      // If image is uploaded, update it too
      if (req.file) {
        const productSubImage = await uploadToCloudinary(req.file);
        updatedFields.productSubImage = productSubImage;
      }

      const updatedSubcategory = await ProductSubcategory.findOneAndUpdate(
        { productSubCategoryId }, // use productSubCategoryId from params
        updatedFields,
        { new: true }
      );

      if (!updatedSubcategory) {
        return res.status(404).json({ status: 'fail', message: 'Subcategory not found' });
      }

      res.status(200).json({ status: 'success', data: updatedSubcategory });
    } catch (error) {
      res.status(500).json({ status: 'Server error', message: error.message });
    }
  });
};

























// API to delete a product subcategory
export const deleteProductSubcategory = async (req, res) => {
  console.log("I am inside deleteProductSubcategory")
  console.log(req.params)
  try {
    const subcategory = await ProductSubcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ status: "fail", message: "Subcategory not found" });
    }
    res.status(200).json({ status: "success", message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "Server error", message: error.message });
  }
};
