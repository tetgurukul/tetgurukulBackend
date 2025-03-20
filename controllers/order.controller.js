//Business logic for orders.mode.js

//importing packages.
import express from "express";

import {Order} from "../models/orders.model.js";


//Api for creating (Post) order data in db

export const postOrder = async (req, res) => {

    console.log("Incoming Order Data:", req.body);


    console.log('i am from frontend inside postOrder')

    //destructuring the data from req.body to post it into db.
    const {orderId, customerName, email, phone, whatsapp, address = {},
            products = [], totalAmount, discount, finalAmount, payment = {},
            shippingCharges, deliveryDate, orderStatus, remarks
}= req.body

 // Destructuring address
 const { houseNo, street, city, district, state, pinCode, country } = address;

 // Destructuring payment
 const { paymentId, paymentOrderId, paymentType, paymentMode, paymentStatus, transactionDate } = payment;

    try {
        console.log("Incoming Order Data:", req.body);

        console.log('i am inside try block of post create order')

        //It creates the document in db
        const order = await Order.create(
        
            {
                orderId,
            customerName,
            email,
            phone,
            whatsapp,
            address: { houseNo, street, city, district, state, pinCode, country },
            products,
            totalAmount,
            discount,
            finalAmount,
            payment: { paymentId, paymentOrderId, paymentType, paymentMode, paymentStatus, transactionDate },
            shippingCharges,
            deliveryDate,
            orderStatus,
            remarks
        });

    
        res.status(200).json({status: "success", data: order});
        
    } catch (error) {
        console.log('i am inside catch block of post create order')
        res.status(500).json({status: "Failed", message: error.message});
        
    };

    console.log("__________________________________________________________________")
};
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//API for get order.
//Can be used in reciept, Editing order details, summary and all.

export const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({status: "Success", data: orders});

    } catch (error) {
        res.status(500).json({status:"failed", })
    }
};

//API for getting  order details based on order objectId.

export const getOrderById = async (req, res) => {
    //Recieving order object id from req.params

    const {_id} = req.params;

    try {

        const orders = await Order.findById(_id);
        if(!_id) return res.status(500).json({message: "Product could not be found"});
        res.status(200).json({status: "Success", data: orders});
        
    } catch (error) {
        res.status(500).json({status:"Failed", message:error.message});
        
    }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//API for updating whole document based on order object id.

export const putOrderById = async (req, res) => {
    //Destructuring the data from req.body to put it into Db

    //destructuring the data from req.body to post it into db.
    const {orderId, customerName, email, phone, whatsapp, address = {},
            products = [], totalAmount, discount, finalAmount, payment = {},
            shippingCharges, deliveryDate, orderStatus, remarks
            }= req.body

    // Destructuring address
    const { houseNo, street, city, district, state, pinCode, country } = address;

    // Destructuring payment
    const { paymentId, paymentOrderId, paymentType, paymentMode, paymentStatus, transactionDate } = payment;
    
    const {_id} = req.params;

    try {
        
        const order = await Order.findById(_id);
        if(!_id) return res.status(500).json({message:"Product Data not found"});

        order.orderId                  = orderId                  || order.orderId;
        order.customerName             = customerName             || order.customerName;
        order.email                    = email                    || order.email;
        order.phone                    = phone                    || order.phone;
        order.whatsapp                 = whatsapp                 || order.whatsapp;
        order.address.houseNo          = houseNo                  || order.address.houseNo;
        order.address.street           = street                   || order.address.street;
        order.address.city             = city                     || order.address.city;
        order.address.district         = district                 || order.address.district;
        order.address.state            = state                    || order.address.state;
        order.address.pinCode          = pinCode                  || order.address.pinCode;
        order.address.country          = country                  || order.address.country;
        order.products                 = products                 || order.products;
        order.totalAmount              = totalAmount              || order.totalAmount;
        order.discount                 = discount                 || order.discount;
        order.finalAmount              = finalAmount              || order.finalAmount;
        order.payment.paymentId        = paymentId                || order.payment.paymentId;
        order.payment.paymentOrderId   = paymentOrderId           || order.payment.paymentOrderId;
        order.payment.paymentType      = paymentType              || order.payment.paymentType;
        order.payment.paymentMode      = paymentMode              || order.payment.paymentMode;
        order.payment.paymentStatus    = paymentStatus            || order.payment.paymentStatus;
        order.payment.transactionDate  = transactionDate          || order.payment.transactionDate;
        order.shippingCharges          = shippingCharges          || order.shippingCharges;
        order.deliveryDate             = deliveryDate             || order.deliveryDate;
        order.orderStatus              = orderStatus              || order.orderStatus;
        order.remarks                  = remarks                  || order.remarks;

        const updateOrder = await order.save();
        res.status(200).json({status:"Success", message:"Data updated successfully", data: order});

    } catch (error) {
        res.status(500).json({status: "Failed", message: error.message});
    }
};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//API for deleting order Detials using object id.

export const deleteOrderById = async (req, res) => {
    const {_id} = req.params;

    try {

        const order = await Order.findById(_id);

        if(!order) return res.status(500).json({status:"Failed", message:"Product data not found"});
        await Order.deleteOne({_id:_id});
        res.status(200).json({status: "Success", message: "Order detail deleted successfully!"}); 
    } catch (error) {
        res.status(500).json({status:"Failed", message:error.message});
    };
};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//API for getting  order details by order Id for payment handling..

export const getOrderByOrderId = async (req, res) => {
    //Recieving order object id from req.params

    const {orderId} = req.params;

    try {
        console.log('i am inside get order')

        const orders = await Order.findOne({orderId});
        if(!orderId) return res.status(500).json({message: "Product could not be found"});
        res.status(200).json({status: "Success", data: orders});
        console.log(orderId)
        
    } catch (error) {
        res.status(500).json({status:"Failed", message:error.message});
        
    }
}



//API for getting  order details based on order phoneNumber.

export const getOrderByPhoneNumber = async (req, res) => {
    //Recieving order object id from req.params
    console.log("i am inside")

    const {phone} = req.params;
    console.log(phone)
    try {

        const orders = await Order.find({phone:phone});
        if(!orders) return res.status(500).json({message: "Product could not be found"});
        res.status(200).json({status: "Success", data: orders});
        
    } catch (error) {
        res.status(500).json({status:"Failed", message:error.message});
        
    }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// Backend API to update payment status
export const updatePaymentStatus = async (req, res) => {
    try {

       console.log('i am insdie update payments status')
        

      const { _id } = req.params; // Get orderId from request parameters
      console.log(_id)
  
      // Find the order using the orderId
      const order = await Order.findById(_id);
  
      if (!_id) {
        return res.status(404).json({ message: "Order not found", data:order });
      }
  
      // Update the payment status to "Paid"
      order.payment.paymentStatus = "Paid";
  
      // Save the updated order in the database
      await order.save();
  
      // Respond back with success
      return res.status(200).json({ message: "Payment status updated successfully", order });
    } catch (error) {
      console.error("Error updating payment status:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  //______________________________________________________