// BACKEND/models/product.Category.Model.js

//Product category is being defined here. Like HTET, UPTET, CTET KIND OF PRODUCTS

import mongoose, {mongo, Schema} from "mongoose";

const productCategorySchema = new Schema({
    productCategoryId: {
      type: String, // or Number depending on your ID format
      required: true,
      unique: true
    },
    productCategoryName: {
      type: String,
      required: true,
      trim: true
    },
    productCategoryImage: {
      type: String, // URL or file path for the image
      
    },
    aboutProductCategory: {
      type: String,
     
    },
    descriptionProductCategory: {
      type: String,
     
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'], // Define status options
      default: 'active'
    }
  }, { timestamps: true });
  
//   const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
  
//   module.exports = ProductCategory;
  export const ProductCategory = mongoose.model('ProductCategory', productCategorySchema)