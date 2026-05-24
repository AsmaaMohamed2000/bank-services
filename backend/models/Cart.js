const mongoose=require('mongoose')
const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId ,ref:'User',required:true
    },
    cartNumber:{
        type:String, required:true
    },
    CVV:{
        type:String, required:true
    },
    expiryDate:{
        type:String, required:true
    },
    balance:{
        type:Number,default:0
    },
    createdAt:{type:Date,default:Date.now}
})
module.exports=mongoose.model('Cart',cartSchema)