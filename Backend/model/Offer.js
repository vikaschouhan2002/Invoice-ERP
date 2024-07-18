import mongoose from "mongoose";
const Offer = mongoose.Schema({
    lead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lead',
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    status:{
        type:String,
    },
    note:{
        type:String
    },
    startDate:{
        type:String,
        required:true
    },
    expiryDate:{
        type:String,
        required:true
    },
    itemList:[
        {
            itemName:{
                type:String,
            },
            description:{
                type:String
            },
            quantity:{
                type:Number
            },
            price:{
                type:Number
            },
            total:{
                type:Number
            }
        }
    ],
    subTotal: {
        type: Number,
        default: 0,
    },
    tax:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tax',
        required:true
    },
    taxAmount:{
        type:Number,
        required:true
    },
    grandTotal:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isExpired:{
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

export default mongoose.model("Offer",Offer);