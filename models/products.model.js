//This table lists all the products on the site to be shown.
import mongoose, {Schema} from "mongoose";

const productSchema = new Schema(
    {

        productId: {
            type: String, 
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            

        }, //coudinary or spaces
        productSubName: {
            type: String,
           

        },
        productSubImage: {
            type: String,
            

        }, //coudinary or spaces
        productCategory: {
            type: String,


        },
        productCategoryImage: {
            type: String,

        },  //coudinary or spaces
        price: {
            type: Number,
            required: true

        },
        tax: {
            type: Number,

        },
        shippingCharges: {
            type: Number, 

        },
        deliveryCharges: {
            type: Number, 

        },
        salePrice: {
            type: Number,

        },
        productNameDescription: {
            type: String, 

        },
        productSubNameDescription: {
            type: String, 
            

        },
        productCategoryDescription: {
            type: String,
            

        },
        inStock: {
            type: Boolean,
            default:false

        },
        stockCount: {
            type: Number,
            default: 0,

        },
        productCreationDate: {
            type: Date,
            
        },
        author: {
            type: String,
        },
        
        publisher: {
            type: String,
        },
        ISBN: {
            type: String,
        },
        publicationDate: {
            type: Date,
        },
        edition: {
            type: String,
        },
        format: {
            type: String,
        },
        ratings: {
            type: String,
        },
        discountPercentage: {
            type: String,
        },
        status: {
            type: String,
        },
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
        slug: {
            type: String,
            
        },

    },
    {
        timestamps:true,
    }
);

export const Product = mongoose.model("Product", productSchema);