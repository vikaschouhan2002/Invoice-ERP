import mongoose from "mongoose";
const Company = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact :{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
        ref:'People'
    },
    country:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    website:{
        type:String,
        default:null
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
        required: true,
    },
    createdOn: { 
        type: Date,
        default: Date.now
    },
    modifiedOn: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model("Company",Company);
