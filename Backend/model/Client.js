import mongoose from "mongoose";
const Client = mongoose.Schema({
    type:{
        type:String,
        enum:['People','Company'],
        required:true
    },
    people:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'People',
        default:null
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'Company',
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

export default mongoose.model("Client",Client);
