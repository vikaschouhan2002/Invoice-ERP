import mongoose from "mongoose";
const Tax = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    rate: {
        type: Number,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: false
    },
    isDefault: {
        type: Boolean,
        default: false
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

export default mongoose.model("Tax", Tax);