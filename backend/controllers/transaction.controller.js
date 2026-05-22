const transaction=require('../models/Transactions.model')
const User=require('../models/user')
const depositAndWithdrawTransaction={
    deposit:async (req,res)=>{
        const {amount}=req.body
        const userId=req.user._id
        try{
            const user=await User.findById(userId)
            user.balance+=amount
            await user.save()
              await transaction.create({
                        user:userId,
                        type:'deposit',
                        amount,
                        
                        date:new Date()
                    }) 
                    res.json({message:''})
        }catch(err){
            res.json({message:err.message})
        }

    },
    withdraw:async (req ,res)=>{
            const {amount}=req.body
        const userId=req.user._id
        try{
            const user=await User.findById(userId)
            if(user.balance<amount){
                return res.status(400).json({message:'balance not emough'})
            }

            user.balance+=amount
            await user.save()
              await transaction.create({
                        user:userId,
                        type:'withdraw',
                        amount,
                        
                        date:new Date()
                    }) 
                    res.json({message:''})
        }catch(err){
            res.json({message:err.message})
        }
    },
    getTransactions:async (req ,res)=>{
     try{
           const transactions=(await transaction.find({user:req.user._id})).toSorted({date:-1})
        res.json(transactions)
     }catch(err){
        res.status(500).json({message:err.message})
     }
    }
}