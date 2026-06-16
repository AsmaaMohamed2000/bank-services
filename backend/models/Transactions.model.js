const mongoose = require('mongoose')
const crypto = require('crypto')
const { string } = require('joi')

const transactionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },

    initiatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    type: {
        type: String,
        enum: ['deposit', 'withdraw', 'transfer'],
        required: true
    },

    sourceType: {
        type: String,
        enum: ['account', 'card', 'bank']
    },

    destinationType: {
        type: String,
        enum: ['account', 'card', 'bank']
    },

    amount: {
        type: Number,
        required: true
    },

    fee: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: 'EGP'
    },

    description: {
        type: String
    },

    balanceBefore: {
        type: Number
    },

    balanceAfter: {
        type: Number
    },

    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },

    failureReason: {
        type: String
    },

    processedAt: {
        type: Date
    },

    reference: {
        type: String,
        unique: true
    },
    stripeSessionId:{
        type:String,unique:true,sparse:true
    }

}, {
    timestamps: true
})

transactionSchema.pre('save', function () {
    if (!this.reference) {
        this.reference =` TRX-${crypto.randomBytes(6).toString('hex')}`
    }
    
})

module.exports = mongoose.model('Transaction', transactionSchema)