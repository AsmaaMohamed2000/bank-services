const notification=require('../models/Notifications.model')
const transaction=require('../models/Transactions.model')
const Stripe=require('stripe')
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const depositStripe={
    createDepositSessoin:async (req,res)=>{
        const {amount}=req.body
        const frontend_url='http://localhost:5173'
        try{
            const session=await stripe.checkout.sessions.create({
                payment_method_types:['card'],
                line_items:[
                    {price_data:{
                        currency:'eg',
                        product_data:{name:'deposit to account'},
                        unit_amount:amount*100,

                    },quantity:1,},
                ],
                node:'payment',
                success_url:`${frontend_url}/`,
                cancel_url:`${frontend_url}/`
            })
            res.json({success:true,session_url})
        }catch(err){
            res.json({success:false})
        }
    },
    verifyDeposit:async (req ,res)=>{
const {amount,success}=req.body
const userId=req.user.userId
try{
    if(success==='true'){
        const depositAmount=Number(amount)
        const existingTransaction=await transaction.findOne({
            type:'deposit',
            user:userId,
            amount:depositAmount
        })
        if(existingTransaction){
            return res.json({success:true,message:'transaction transfered already'})
        }
        const user=await UserActivation.findById(userId)
        user.balance=(user.balance ||0)+depositAmount
        await user.save()
        await transaction.create({
            user:userId,
            type:'deposit',
            amount:depositAmount,
            receiver:user.email,
            date:new Date()
        })
        await notification.create({
            user:userId,
            title:'success deposit',
            message:`${depositAmount} sent to stripe account successfully}`
        })
        res.json({
success:true,message:'success veryfy'
        })
    }
}catch(err){
    res.json({success:false})
}
    }

}
module.exports=depositStripe