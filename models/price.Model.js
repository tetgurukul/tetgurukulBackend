//This schema contains all the price of FinalProductsSchema. Price like CP, SP, DISCOUNT, TAX AND MORE...

import mongoose, {Schema} from "mongoose";




// PriceSchema for product prices and associated costs
const priceSchema = new Schema({
  productId: {
    type: String, // Reference to productId in FinalProduct
    required: true,
    ref: 'FinalProduct',
    unique: true
  },
  costPrice: {
    type: Number,  // The cost price of the product
    required: true
  },
  salePrice: {
    type: Number,  // The sale price of the product
    required: true
  },
  tax: {
    type: Number,  // Tax applied to the product, could be percentage or absolute value
    default: 0
  },
  gst: {
    type: Number,  // GST applied to the product (can be percentage or amount)
    default: 0
  },
  shippingCharges: {
    type: Number,  // Shipping charges for delivering the product
    default: 0
  },
  deliveryCharges: {
    type: Number,  // Delivery charges associated with the product
    default: 0
  },
  discountPercentage: {
    type: Number,  // Discount percentage applied on the sale price
    default: 0
  }
}, { timestamps: true });

// Create and export the Price model
export const Price = mongoose.model('Price', priceSchema);
