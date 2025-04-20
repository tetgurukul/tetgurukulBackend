//It contains all the users signup data. Inculding data of admins. 

import mongoose, {Schema} from "mongoose";

const UserModelSchema = new Schema({
    UserName: {
      type: String, // or Number depending on your ID format
      required: true,
      
    },
    UserMobile: {
      type: String,
      required: true,
      trim: true
    },

    UserPassword: {
        type: String, // URL or file path for the image
        required: true,
      },


    isUserAdmin: {
      type: Boolean, // URL or file path for the image
      default: false
    },
    isUserCustomer: {
        type: Boolean, // URL or file path for the image
        default: false
    },
    isUserDeliveryPartner: {
        type: Boolean, // URL or file path for the image
        default: false
     
    },
    isUserActive: {
        type: Boolean, // URL or file path for the image
        default: true, // this tells that user is the part of the tetgurukul app
     
    },
    
  }, { timestamps: true });
  
//   const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
  
//   module.exports = ProductCategory;
  export const User = mongoose.model('User', UserModelSchema)