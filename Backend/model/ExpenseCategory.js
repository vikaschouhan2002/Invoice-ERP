import mongoose from "mongoose";
const ExpensesCategory= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
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

export default mongoose.model("ExpensesCategory",ExpensesCategory);