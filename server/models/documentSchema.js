import mongoose from "mongoose";
const DocumentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    content: mongoose.Schema.Types.Mixed,
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