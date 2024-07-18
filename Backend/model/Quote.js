import mongoose from "mongoose";
var Quote=mongoose.Schema({
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client',
        required:true
    },
    quoteNumber:{
        type:Number,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
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
    currency : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Currency',
        required : true
    },
    itemList:[
        {
            item:{
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
    total:{
        type:Number,
        required:true
    },
    tax:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tax',
        required:true
    },
    taxRate:{
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

export default mongoose.model("Quote",Quote);