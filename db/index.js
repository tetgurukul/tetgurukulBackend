//Connecting to a database

import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Below function connects to the database.

const connectDb = async () => {

    try {
        const connectionToDb = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        console.log(`MongoDb connected: ${connectionToDb.connection.host}`);
    } catch (error) {

        console.error(`Eroor: ${error.message}`);
        process.exit(1);
        
    }


};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

export default connectDb;

