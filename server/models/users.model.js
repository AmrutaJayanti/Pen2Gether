import mongoose from "mongoose";
const UserSchema={
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
        match:/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
        required:true,
        unique:true
    },
    confirmPassword:{
        type:String,
        required:true,
        unique:true
    }
}
export default mongoose.model("User",UserSchema);