import mongoose from "mongoose";
const Product = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductCategory',
        required:true
    },
    currency:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Currency',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ref:{
        type:String
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

export default mongoose.model("Product",Product);
