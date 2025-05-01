import mongoose from "mongoose";
const DocumentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    collaborators:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    }],
    isPublic:{
        type:Boolean,
        default:false
    }
})
export default mongoose.model("Document",DocumentSchema);