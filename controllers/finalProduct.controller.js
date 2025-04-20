// controllers/finalProduct.controller.js
import { FinalProduct } from "../models/FinalProduct.Modiel.js";
import { Price } from "../models/price.Model.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js"; // Cloudinary upload function
import multer from "multer";

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/temp'); // Store files in public/temp folder
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName); // Generate a unique file name
  }
});



// Multer instance for image upload (single image)
const upload = multer({ storage }).single('productImage'); // productImage key from form-data


// Create a new Final Product (POST request)
export const createFinalProduct = async (req, res) => {
  console.log("Entered createFinalProduct function");


// Upload product image to Cloudinary
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "File upload error" });

    try {
      // Destructuring data from req.body
      const {
        productCategory,
        productSubCategory,
        productId,
        productName,
        productBy,
        aboutProduct,
        descriptionProduct,
        inStock,
        stockCount,
        author,
        publisher,
        publicationDate,
        edition,
        format,
        ratings,
        status,
        metaTitle,
        metaDescription,
        slug,
      } = req.body;

      // Upload product image to Cloudinary
      const productImage = req.file ? await uploadToCloudinary(req.file) : "";

      // Create the final product
      const finalProduct = await FinalProduct.create({
        productCategory,
        productSubCategory,
        productId,
        productName,
        productImage,
        productBy,
        aboutProduct,
        descriptionProduct,
        inStock,
        stockCount,
        author,
        publisher,
        publicationDate,
        edition,
        format,
        ratings,
        status,
        metaTitle,
        metaDescription,
        slug,
      });

      res.status(201).json({ status: "success", data: finalProduct });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });
};

// Get all Final Products (GET request)
export const getFinalProducts = async (req, res) => {
  try {
    const finalProducts = await FinalProduct.find();
    res.status(200).json({ status: "success", data: finalProducts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get a specific Final Product by ID (GET request)


export const getFinalProductById = async (req, res) => {
   
console.log(" i am inside final product controller")
    const {productSubCategory} = req.params
    console.log(req.params)
  try {
    const finalProduct = await FinalProduct.find({productSubCategory:productSubCategory});
    if (!finalProduct) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "success", data: finalProduct });
    
    console.log(finalProduct)
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};






// export const getFinalProductById = async (req, res) => {
//     const { productSubCategory } = req.params;
  
//     try {
//       // Fetch the final products based on the productSubCategory
//       const finalProduct = await FinalProduct.find({ productSubCategory: productSubCategory });
  
//       if (!finalProduct || finalProduct.length === 0) {
//         return res.status(404).json({ status: "error", message: "Product not found" });
//       }
  
//       // Fetch the price information based on productId (from finalProduct)
//       const productIds = finalProduct.map((product) => product.productId); // Extract productId from finalProduct
//       const prices = await Price.find({ productId: { $in: productIds } });
  
//       if (!prices || prices.length === 0) {
//         return res.status(404).json({ status: "error", message: "Product price could not be found" });
//       }
  
//       // Combine the product and price data
//       const combinedData = finalProduct.map((product) => {
//         // Find the matching price for the current product
//         const productPrice = prices.find((price) => price.productId === product.productId);
  
//         // Return a new object combining the product and price data
//         return {
//           ...product.toObject(), // Convert Mongoose object to plain JS object
//           price: productPrice ? productPrice : null, // Add price info if found, otherwise null
//         };
//       });
  
//       // Send the combined data in the response
//       res.status(200).json({ status: "success", data: combinedData });
//     } catch (error) {
//       res.status(500).json({ status: "error", message: error.message });
//     }
//   };





// Update a Final Product by ID (PUT request)
export const updateFinalProduct = async (req, res) => {
  try {
    const finalProduct = await FinalProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!finalProduct) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "success", data: finalProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete a Final Product by ID (DELETE request)
export const deleteFinalProduct = async (req, res) => {
  try {
    const finalProduct = await FinalProduct.findByIdAndDelete(req.params.id);
    if (!finalProduct) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "success", message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
