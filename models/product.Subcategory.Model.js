//It stores the product sub categories.
//Sub categories like, if ProductCategory is CTET, then Subcategory would be like, Hindi Medium or English Medium subjects.

import mongoose, {Schema} from "mongoose";



const productSubcategorySchema = new Schema({
  productCategory: {
    type: String,
    ref: 'ProductCategory',
    required: true
  },
  productSubCategoryId: {
    type: String,
    required: true
  },
  productSubName: {
    type: String,
    required: true,
    trim: true
  },
  productSubImage: {
    type: String, // URL or file path for the image
    
  },
  aboutProductSubcategory: {
    type: String,
    
  },
  descriptionProductSubcategory: {
    type: String,
    
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'], // Define status options
    default: 'active'
  }
}, { timestamps: true });

export const ProductSubcategory = mongoose.model('ProductSubcategory', productSubcategorySchema);



