import mongoose from "mongoose";
const AdminCompany = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Phone: {
        type: Number,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        required: true,
    },
    cell: {
        type: Number,
        required: true,
    },
    websiteUrl: {
        type: String,
        required: true,
    },
    taxNumber: {
        type: Number,
        required: true,
    },
    vatNumber: {
        type: Number,
        required: true,
        default: 91231255234
    },
    regNumber: {
        type: Number,
        required: true,
        default: 91231255234
    },
    isDeleted: {
        type: Boolean,
        default: false
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

export default mongoose.model("AdminComapny", AdminCompany);