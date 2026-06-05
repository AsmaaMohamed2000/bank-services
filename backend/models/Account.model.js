const mongoose=require('mongoose')
const accountSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,ref:'User'
    },
    accountNumber:{
        type:String, required:true ,unique:true 
    },
    iban:{
        type:String , unique:true 
    },
    balance:{
        type:Number, default:0
    },
    currency:{
        type:String, default:'EGP'
    },
    status:{
        type:String ,enum:['active','blocked','closed'],default:'active'
    },
dailyTransferLimit:{
        type:Number, default:50000
    },

},{timestamps:true })
module.exports=mongoose.model('Account',accountSchema)