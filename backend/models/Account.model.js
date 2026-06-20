const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    accountNumber: {
        type: String,
        required: true,
        unique: true
    },

    iban: {
        type: String,
        unique: true
    },

    accountType: {
        type: String,
        enum: ['checking', 'savings',' business'],
        default: 'checking'
    },

    balance: {
        type: Number,
        default: 4444
    },

    availableBalance: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: 'EGP'
    },

    status: {
        type: String,
        enum: ['active', 'blocked', 'closed'],
        default: 'active'
    },

    dailyTransferLimit: {
        type: Number,
        default: 50000
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    lastTransactionAt: {
        type: Date
    }

}, {
    timestamps: true
})

module.exports =  mongoose.models.Account || mongoose.model('Account', accountSchema);