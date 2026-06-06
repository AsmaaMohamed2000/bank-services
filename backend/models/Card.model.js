const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },

    cardNumber: {
        type: String,
        required: true,
        unique: true
    },

    last4: {
        type: String
    },

    cardHolderName: {
        type: String,
        required: true
    },

    network: {
        type: String,
        enum: ['visa', 'mastercard'],
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'blocked', 'expired'],
        default: 'active'
    },

    isFrozen: {
        type: Boolean,
        default: false
    },

    expiryDate: {
        type: String,
        required: true
    },

    cvvHash: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Card', cardSchema)