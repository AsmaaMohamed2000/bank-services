const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    code:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:[
            'verify-email',
            'reset-password',
            'transfer',
            'login'
        ],
        required:true
    },

    expiresAt:{
        type:Date,
        required:true
    },

    verified:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
otpSchema.index({expiresAt:1},{expireAfterSeconds:0})
module.exports = mongoose.model('Otp', otpSchema)

