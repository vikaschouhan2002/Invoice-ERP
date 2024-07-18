import mongoose from "mongoose";
var Currency = mongoose.Schema({
    currencyName:{
        type:String,
        required:true,
    },
    currencySymbol:{
        type:String,
        required:true
    },
    currencyPosition:{
        type:String,
        required:true
    },
    decimalSeparator:{
        type:String,
        required:true
    },
    thousandSeparator:{
        type:String,
        required:true
    },
    centPrecision:{
        type:Number,
        required:true
    },
    zeroFormate:{
        type:Boolean,
        default:false
    },
    isEnabled:{
        type:Boolean,
        default:false
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

export default mongoose.model("Currency",Currency);