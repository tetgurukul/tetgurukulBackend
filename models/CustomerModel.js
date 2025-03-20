//Holds the customer signup details


// Importing packages
import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            sparse: true // Allows unique constraint on optional fields
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        whatsapp: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export const Customer = mongoose.model("Customer", customerSchema);