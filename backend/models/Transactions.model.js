const mongoose=require('mongoose')
const transactionSchema=new mongoose.Schema({
     user:{
                type:mongoose.Schema.Types.ObjectId ,ref:'User',required:true
            },
    type:{
        type:String,enum:['deposit','withdraw','transfer','receive',
'deposit-card','withdraw-to-card','transfer-to-card','transfer-to-account'
        ],required:true
    },
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now},
receiver:{type:String}
})

module.exports=mongoose.model('Transaction',transactionSchema)