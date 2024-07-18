import mongoose, { mongo } from "mongoose";
const Payment = mongoose.model({
    paymentNumber:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentMode:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    reference:{
        type:String,
    },
    description:{
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

export default mongoose.model("Payment",Payment);