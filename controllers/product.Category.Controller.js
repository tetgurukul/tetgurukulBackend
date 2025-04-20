

//Importing packages
import express from "express";
import multer from "multer";

// Interacts with local file path system (using node.js)
import path from "path";
import { fileURLToPath } from "url";  // Import fileURLToPath to handle ES modules

// Importing models
import { ProductCategory } from "../models/product.Category.Model.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { Console } from "console";

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

// Multer instance for single image only
const upload = multer({ storage }).single("productCategoryImage");

// API for Adding or creating product category data from req.body to DB.
export const createProductCategory = async (req, res) => {
    console.log('Entered create product category function');
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ message: "File upload error" });

        // Destructuring the data from req.body to post it into DB
        const { productCategoryId, productCategoryName, aboutProductCategory, descriptionProductCategory, status } = req.body;

        // If there are files, upload them to Cloudinary
        try {
            let productCategoryImage = "";
            if (req.file) {
                productCategoryImage = await uploadToCloudinary(req.file);
            }

            // Create the product category in the database
            const productCategory = await ProductCategory.create({
                productCategoryId, productCategoryName, productCategoryImage, aboutProductCategory, descriptionProductCategory, status
            });

            res.status(201).json({ status: "success", data: productCategory });

        } catch (error) {
            console.log('entered catch block')
            res.status(500).json({ status: "Server error", message: error.message });
        }
    });
};

// API for getting all product categories
export const getProductCategories = async (req, res) => {
    console.log(' i am inside')
    try {
        const categories = await ProductCategory.find();
        res.status(200).json({ status: "success", data: categories });
        console.log(categories)
    } catch (error) {
        res.status(500).json({ status: "Server error", message: error.message });
    }
};

// API for getting a single product category by ID
export const getProductCategoryByProductId = async (req, res) => {
    console.log('i am inside getProductCategoryByProductId controller api')

    const {productCategoryId} = req.params
    try {
        const category = await ProductCategory.find({productCategoryId:productCategoryId});
        if (!category) {
            return res.status(404).json({ status: "fail", message: "Category not found" });
        }
        res.status(200).json({ status: "success", data: category });
    } catch (error) {
        res.status(500).json({ status: "Server error", message: error.message });
    }
};






// API for updating product category
export const updateProductCategory = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ message: 'File upload error' });
  
      const { productCategoryId } = req.params;
      const {
        productCategoryName,
        aboutProductCategory,
        descriptionProductCategory,
        status,
      } = req.body;
  console.log(req.params)
  console.log(req.body)
      try {
        let updatedFields = {
          productCategoryName,
          aboutProductCategory,
          descriptionProductCategory,
          status,
        };
  
        // If image is uploaded, update it too
        if (req.file) {
          const productCategoryImage = await uploadToCloudinary(req.file);
          updatedFields.productCategoryImage = productCategoryImage;
        }
  
        const updatedCategory = await ProductCategory.findOneAndUpdate(
          { productCategoryId }, // use productCategoryId from params
          updatedFields,
          { new: true }
        );
  
        if (!updatedCategory) {
          return res.status(404).json({ status: 'fail', message: 'Category not found' });
        }
  
        res.status(200).json({ status: 'success', data: updatedCategory });
      } catch (error) {
        res.status(500).json({ status: 'Server error', message: error.message });
      }
    });
  };
  














// API for deleting a product category
export const deleteProductCategory = async (req, res) => {
    console.log('i am inside productCategory')
    try {
        const category = await ProductCategory.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ status: "fail", message: "Category not found" });
        }
        res.status(200).json({ status: "success", message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "Server error", message: error.message });
    }
};
