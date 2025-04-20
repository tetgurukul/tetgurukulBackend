//All the business logic and rest apis for User.Modle.js

import {User} from "../models/UserModel.js";



// Create a new Final Product (POST request)
export const createUser = async (req, res) => {
  console.log("Entered createFinalProduct function");

 
    try {
      // Destructuring data from req.body
      const {
       UserName,
       
       UserMobile,

       UserPassword,
       isUserAdmin,
       isUserCustomer,
       isUserDeliveryPartner,
       isUserActive,

      } = req.body;


      // Create the final product
      const user = await User.create({
        UserName,
        
        UserMobile,
        UserPassword,
        isUserAdmin,
        isUserCustomer,
        isUserDeliveryPartner,
        isUserActive,
      });

      res.status(201).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  ;
};