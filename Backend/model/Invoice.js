import mongoose from "mongoose";
const Invoice = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    invoiceNumber: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    startDate: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    itemList: [
        {
            item: {
                type: String,
            },
            description: {
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            },
            total: {
                type: Number
            }
        }
    ],
    subTotal: {
        type: Number,
        default: 0,
    },
    tax: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax',
        required: true
    },
    taxRate: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
    },
    payment: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Payment',
        },
    ],
    paymentStatus: {
        type: String,
        default: 'unpaid',
        enum: ['unpaid', 'paid', 'partially'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isExpired: {
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

export default mongoose.model("Invoice", Invoice);