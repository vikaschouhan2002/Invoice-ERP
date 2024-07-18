import mongoose, { mongo } from "mongoose";
const Lead = mongoose.Schema({
    type: {
        type: String,
        enum: ['Company', 'People'],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    source: {
        type: String,
    },
    people: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        default: null
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default: null
    },
    notes: {
        type: String,
        default: ''
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

export default mongoose.model("Lead", Lead);