//Razor pay setup

//Importing packages
import Razorpay from "razorpay";

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_vNUy5CyoqkDAdo"  ,
    key_secret: process.env.RAZORPAY_KEY_SECRET || "yR8qmhHVHDbozr725y2zJDEv"
});

export default razorpay;



