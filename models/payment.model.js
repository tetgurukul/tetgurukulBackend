import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentId: {
      type: String, // Razorpay payment ID
    },
    paymentOrderId: {
      type: String, // Razorpay order ID
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["COD", "Online"],
    },
    paymentMode: {
      type: String,
      enum: ["UPI", "Card", "Net Banking", "Wallet", "COD"],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Success", "Failed", "Refunded"],
      default: "Pending",
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    receiptUrl: {
      type: String, // Razorpay receipt link if needed
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
