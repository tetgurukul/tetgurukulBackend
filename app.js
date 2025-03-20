//App entry point

//Here we will create our express app then, will be exported and, then...
//... can be imported in our main index.js file
import express from "express";

//Importing neccessary packages.
import cors from "cors";

import cookieParser from "cookie-parser";

import bodyParser from "body-parser";
const { json, urlencoded } = bodyParser;

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

/* 
all the middle wares and configuration are done using app.use() method
*/

const app = express()

//Cors configuration.
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*" ,
    credentials: true,
}));

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Configuration for accepting json format from frontend.
app.use(json({
    limit:"16kb"
}));

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Configuration for accepting the url-encoded data.
app.use(urlencoded({
    extended:true,
    limit: "16kb"
}));

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Sometimes we would want to store public assests like images, and doc...
//...or any type of media. So following is the configuration.
app.use(express.static("public"));

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//cookieParser confugration.
app.use(cookieParser());

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Importin all Routes in below block
// import connectDb from "./db/index.js";

import productRoutes from "./routes/products.route.s.js";
import orderRoutes from "./routes/orders.route.js";
import razorpayPaymentRoutes from "./routes/razorpayPayment.route.js";
import customerRoutes from "./routes/customer.route.js";

app.use("/uploads", express.static("public/uploads"));

//API routes

app.use("/api", productRoutes) // /api/createProduct for nodemon texting for crating product
app.use("/api", orderRoutes);
app.use("/api/payments", razorpayPaymentRoutes);
app.use("/api", customerRoutes);


export { app }