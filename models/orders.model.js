//This table Stores the order data done by buyer

//Importing packages
import mongoose, {Schema} from "mongoose";

const orderSchama = new Schema (

    {
        orderId:{
            type: String, 
            required: true,
            unique: true
        },
        customerName: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        whatsapp: {
            type: String,
            required: true
        },
        address: {
            houseNo: {type: String, required: true},
            street: {type: String, required: true},
            city: {type: String, required: true},
            district: {type: String},
            state: {type: String, required: true},
            pinCode: {type: String, required: true},
            country: {type: String},
        },
        products: [
            {
                productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
                productName: {type: String, required: true},
                price: {type: Number, required: true},
                quantity: {type: Number, required: true, default: 1},
                totalPrice: {type: Number, required: true}, //price * quantity

            }
        ],
        totalAmount: {
            type: Number, 
           
        },
        discount: {
            type: Number,
            default: 0
        },
        finalAmount: {
            type: Number,
           
        },
        payment: {
            paymentId: {type: String,}, //Stores Razorpay payment id
            paymentOrderId: {type: String, }, //Razorpay order id
            paymentType: {type: String, }, //enum: ["COD", "Online"]
            paymentMode: {type: String, }, //enum: ["UPI", "Card", "Net Banking", "Wallet", "COD" ] //Razorpay modes
            paymentStatus: {type: String, }, //enum: ["Pending", "Success", "Failed", "Refunded"]
            transactionDate: {type: Date, default: Date.now},
        },
        shippingCharges: {
            type: Number,
            default: 0,
        },
        deliveryDate: {
            type: Date,
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled", "Returned"],
            default: "Pending",
        },
        remarks: {
            type: String, //For any instructions
        },

    },
    {
        timestamps: true,
    }

);


export const Order = mongoose.model("Order", orderSchama);