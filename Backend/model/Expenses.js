import mongoose from "mongoose";
const Expense =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    expenseCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ExpensesCategory',
        required:true
    },
    currency:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Currency",
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    description:{
        type:String
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

export default mongoose.model("Expense",Expense);