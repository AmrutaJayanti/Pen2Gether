import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:false,
        required:true
    },
    email:{
        type:String,
        match:/.+\@.+\..+/,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        required:false
    }
});
export default mongoose.model("User",UserSchema);