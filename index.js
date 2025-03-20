//importing dotenv before everything.
import dotenv from "dotenv";

dotenv.config()

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// importing MongoDb connection file.
import connectDb from "./db/index.js";

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//importing server connection file named app.js
import {app} from "./app.js";

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//calling connectDb function for connecting to the database.

connectDb()
.then(() => {
    app.listen(process.env.PORT || 8050, () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    } )
})
.catch((error) => {
    console.log("MongoDB connection failed", error)
})























//Below multilne comment is the one approach to connect to the db...
//... other approach is in /db/index.js
/*


//Connecting to a database

import mongoose from "mongoose";
import {DB_NAME} from "./constant"


//creating an express app

import express from "express";
const app = express();

//^^^^^^^^^^^^^^^^^^^^^^^^^





//Below block of code connects to the database.

;( async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        //if our express app is not able to talk to the database then...
        //...below code tells us that. Sometimes express does not connect...
        //...to the database. Below snippet listens to the express event.

        app.on("error", (error) => {
            console.log("EROOR: ", error);
            throw error;
        })

        //Now, if we are able to connect to the mongodb, then we stgart our server...
        //...right after the db_connection using express.

        app.listen(process.env.PORT, () => {
            console.log(`App is running on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw error;
        
    }


} )()

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


*/


















// const express = require ('express');

// const app = express();
// const PORT = process.env.PORT || 8050;



// app.get('/', (req, res) =>  res.send("<div>Hi</div>"));

// app.listen(PORT, function() {
//     console.log(`server is running on port: ${PORT}`)
// })