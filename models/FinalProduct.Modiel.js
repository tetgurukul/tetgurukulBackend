//This schema contains the actual products that will be sold online.

//Flow  CTET(CATEGORY) ==> HINDI/ENGLISH (SUB CATEGORY) ==> HINDI (V - VIII) (PRODUCTS TO BE SOLD)

import mongoose, {Schema} from "mongoose";



// FinalProduct Schema
const finalProductSchema = new Schema({
  productCategory: {
    type: String,  // Reference to productCategoryId in ProductCategory
    required: true,
    ref: 'ProductCategory'
  },
  productSubCategory: {
    type: String,  // Reference to productSubCategoryId in ProductSubcategory
    required: true,
    ref: 'ProductSubcategory'
  },
  productId: {
    type: String,  // Unique identifier for the product
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  productImage: {
    type: String,  // URL or path to the product image
   
  },
  productBy: {
    type: String,  // The entity or manufacturer of the product
    
  },
  aboutProduct: {
    type: String,  // Brief description of the product
    
  },
  descriptionProduct: {
    type: String,  // Detailed description of the product
    
  },
  inStock: {
    type: Boolean,  // Indicates if the product is in stock
    default: true
  },
  stockCount: {
    type: Number,  // Number of units in stock
    default: 0
  },
  author: {
    type: String,  // Author of the product (if applicable, e.g., for books)
    trim: true
  },
  publisher: {
    type: String,  // Publisher (if applicable, e.g., for books)
    trim: true
  },
  publicationDate: {
    type: Date  // Publication date (if applicable, e.g., for books)
  },
  edition: {
    type: String,  // Edition of the product (if applicable)
    trim: true
  },
  format: {
    type: String,  // Format of the product (e.g., hardcover, paperback, etc.)
    trim: true
  },
  ratings: {
    type: Number,  // Average rating of the product
    
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],  // Product status
    default: 'active'
  },
  metaTitle: {
    type: String,  // Meta title for SEO purposes
    trim: true
  },
  metaDescription: {
    type: String,  // Meta description for SEO purposes
    trim: true
  },
  slug: {
    type: String,  // URL slug for the product (for SEO)
    required: true,
    unique: true
  }
}, { timestamps: true });

// Create and export the FinalProduct model
export const FinalProduct = mongoose.model('FinalProduct', finalProductSchema);
