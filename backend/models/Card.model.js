const mongoose=require('mongoose')
const cardSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId ,ref:'User',required:true
    },
    account:{
         type:mongoose.Schema.Types.ObjectId ,ref:'Account',required:true
    },
    cardNumber:{
        type:String, required:true ,unique:true
    },
    cardType:{
        type:String,enum:['visa','mastercard']
    },
     status:{
        type:String ,enum:['active','blocked','expired'],default:'active'
    },
    expiryDate:{
        type:String, required:true
    },
  
    
},{timestamps:true})
module.exports=mongoose.model('Card',cardSchema)