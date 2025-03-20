//importing files.
import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import {Order} from "../models/orders.model.js";
import { Payment } from "../models/payment.model.js";


//This API generates a Razorpay Order ID and saves it to the DB.
export const createPaymentOrder = async (req, res) => {
    console.log('I am inside createPaymentOrder');
    try {
        const { orderId, amount } = req.body;

        // Check if payment already exists for this orderId
        const existingPayment = await Payment.findOne({ orderId });

        if (existingPayment) {
            // If the payment exists, return the existing payment order ID
            console.log("Payment record already exists for this order, not creating a new one.");
            return res.status(200).json({
                success: true,
                razorpayOrderId: existingPayment.paymentOrderId,
                amount: existingPayment.amountPaid,
                currency: "INR",
            });
        }

        // Custom orderId ke basis par Order fetch karna
        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        console.log("Order Found:", order._id); // Debugging

        // Razorpay ke liye order options
        const options = {
            amount: amount * 100, // INR to paisa conversion
            currency: "INR",
            receipt: `order_rcptid_${order._id}`,
            payment_capture: 1,
        };

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create(options);

        // Create new payment record in the DB
        const newPayment = new Payment({
            orderId: order._id, // Actual MongoDB _id
            paymentOrderId: razorpayOrder.id,
            paymentType: "Online",
            amountPaid: amount,
            paymentStatus: "Pending",
        });

        await newPayment.save();

        res.status(200).json({
            success: true,
            razorpayOrderId: razorpayOrder.id,
            amount: amount,
            currency: "INR",
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


  //After successful payment, razorpay sends a response.
  //We veryfy it and update the payment model

 

//   export const verifyPayment = async (req, res) => {
//     console.log('i am iside verifypayment ')
//     try {
//         const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

//         console.log("🔍 Verifying Payment:");
//         console.log("✅ Received razorpay_payment_id:", razorpay_payment_id);
//         console.log("✅ Received razorpay_order_id:", razorpay_order_id);
//         console.log("✅ Received razorpay_signature:", razorpay_signature);

//         if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
//             console.error("❌ Missing payment details");
//             return res.status(400).json({ error: "Missing payment details" });
//         }

//         // 🗝️ Load Razorpay Secret Key
//         const secret = process.env.RAZORPAY_KEY_SECRET;
//         console.log("🗝️ Using Secret Key:", secret);

//         // 🔄 Generate Expected Signature
//         const expectedSignature = crypto
//             .createHmac("sha256", secret)
//             .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//             .digest("hex");

//         console.log("✅ Expected Signature:", expectedSignature);
//         console.log("🔄 Received Signature:", razorpay_signature);

//         // 🔍 Compare Signatures
//         if (expectedSignature !== razorpay_signature) {
//             console.error("❌ Signature Mismatch!");

//             // Log failed payment attempt
//             await Payment.create({
//                 paymentOrderId: razorpay_order_id,
//                 paymentId: razorpay_payment_id,
//                 paymentStatus: "Failed",
//                 failureReason: "Signature mismatch",
//                 createdAt: new Date(),
//             });

//             return res.status(400).json({ error: "Invalid signature, payment verification failed" });
//         }

//         console.log("✅ Payment Verified Successfully!");

//         // 📝 Check if payment already marked as "Success"
//         const existingPayment = await Payment.findOne({ paymentOrderId: razorpay_order_id });

//         if (!existingPayment) {
//             console.error("❌ Payment record not found in database");
//             return res.status(404).json({ error: "Payment record not found" });
//         }

//         if (existingPayment.paymentStatus === "Success") {
//             console.log("🔁 Payment already verified, skipping update.");
//             return res.status(200).json({ success: true, message: "Payment already verified", payment: existingPayment });
//         }

//         // ✅ Update Payment Status in Database
//         existingPayment.paymentId = razorpay_payment_id;
//         existingPayment.paymentStatus = "Success";
//         existingPayment.updatedAt = new Date();
//         await existingPayment.save();

//         console.log("✅ Payment Updated in DB:", existingPayment);

//         // 📨 (Optional) Send Email Confirmation here

//         res.status(200).json({ success: true, message: "Payment verified successfully", payment: existingPayment });

//     } catch (error) {
//         console.error("❌ Error verifying payment:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };



//Veryfypayment updated version
// After successful payment, Razorpay sends a response. We verify it and update the payment model.
export const verifyPayment = async (req, res) => {
    console.log('Inside verifyPayment API');
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        console.log("Verifying Payment:");
        console.log("Received razorpay_payment_id:", razorpay_payment_id);
        console.log("Received razorpay_order_id:", razorpay_order_id);
        console.log("Received razorpay_signature:", razorpay_signature);

        // Check if all required data is present
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            console.error("Missing payment details");
            return res.status(400).json({ error: "Missing payment details" });
        }

        // Verify signature to prevent fraud
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            console.error("Signature Mismatch!");
            return res.status(400).json({ error: "Invalid signature, payment verification failed" });
        }

        console.log("Payment Verified Successfully!");

        // Check if the payment order already exists in the DB
        const existingPayment = await Payment.findOne({ paymentOrderId: razorpay_order_id });

        if (!existingPayment) {
            console.error("Payment record not found in database");
            return res.status(404).json({ error: "Payment record not found" });
        }

        // If payment is already marked as "Success", do not update again
        if (existingPayment.paymentStatus === "Success") {
            console.log("Payment already verified, skipping update.");
            return res.status(200).json({ success: true, message: "Payment already verified", payment: existingPayment });
        }

        // Update payment record to success
        existingPayment.paymentId = razorpay_payment_id;
        existingPayment.paymentStatus = "Success";
        existingPayment.updatedAt = new Date();
        await existingPayment.save();

        console.log("Payment Updated in DB:", existingPayment);

        // Respond to the frontend
        res.status(200).json({ success: true, message: "Payment verified successfully", payment: existingPayment });

    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



