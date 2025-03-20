//In this file, user schema is being defined.
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        
    }
);

export const User = mongoose.model("User", userSchema)