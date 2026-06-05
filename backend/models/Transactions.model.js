const mongoose=require('mongoose')
const crypto=require('crypto')
const transactionSchema=new mongoose.Schema({
    sender:{
                type:mongoose.Schema.Types.ObjectId ,ref:'Account'
            },
            receiver:{
                type:mongoose.Schema.Types.ObjectId ,ref:'Account'
            },
    type:{
        type:String,enum:['deposit','withdraw','transfer',
        ],required:true
    },
    sourceType:{
        type:String, enum:['account','card','bank']
    },
    destinationType:{
        type:String, enum:['account','card','bank']
    },
    amount:{type:Number,required:true},
    status:{
        type:String ,enum:['pending' ,'success' ,'failed']
    }
    ,reference:{
        type:String , unique:true ,required:true 
    }
},{timestamps:true})
transactionSchema.pre('save' ,function(next){
    if(!this.reference){
        this.reference=`TRK-${crypto.randomBytes(5).toString('hex')}`
    }
    next()
})
module.exports=mongoose.model('Transaction',transactionSchema)