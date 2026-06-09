const Notification=require('../models/Notifications.model')
const Transaction=require('../models/Transactions.model')
const Stripe=require('stripe')
const Account=require('../models/Account.model')
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const depositStripe={
     createDepositSession : async(req,res)=>{

   try{

      const { amount } = req.body

      if(!amount || amount <= 0){

         return res.status(400).json({
            success:false,
            message:'Invalid amount'
         })
      }

      const session =
         await stripe.checkout.sessions.create({

            payment_method_types:['card'],

            line_items:[

               {

                  price_data:{

                     currency:'egp',

                     product_data:{
                        name:'Account Deposit'
                     },

                     unit_amount:
                        Number(amount) * 100
                  },

                  quantity:1
               }

            ],

            mode:'payment',

            success_url:
             `http://localhost:5173/deposit-success?amount=${amount}`,

            cancel_url:
            `http://localhost:5173/dashboard`
         })

      res.status(200).json({

         success:true,

         session_url:session.url
      })

   }catch(err){

      res.status(500).json({

         success:false,

         message:err.message
      })
   }},

   verifyDeposit :async(req,res)=>{

   try{

      const userId = req.body.user._id

      const  amount  = req.body.amount

      const depositAmount =
         Number(amount)

      if(!depositAmount){

         return res.status(400).json({
            success:false,
            message:'Invalid amount'
         })
      }

      const account =
         await Account.findOne({
            user:userId
         })

      if(!account){

         return res.status(404).json({
            success:false,
            message:'Account not found'
         })
      }
      const existingTransaction =
   await Transaction.findOne({

      initiatedBy:userId,

      type:'deposit',

      amount:depositAmount,

      status:'success'
   })
   if(existingTransaction){

   return res.json({

      success:true,

      message:'Already processed'
   })
}
account.balance += depositAmount

await account.save()
await Transaction.create({

   receiver: account._id,

   initiatedBy: userId,

   type: 'deposit',

   sourceType: 'bank',

   destinationType: 'account',

   amount: depositAmount,

   balanceBefore: balanceBefore,

   balanceAfter: account.balance,

   status: 'success',

   description: 'Deposit via Stripe',

   processedAt: new Date()
})
await Notification.create({

   user:userId,

   title:'Deposit Successful',

   message:
    ` ${depositAmount} EGP deposited successfully`
})
res.status(200).json({

   success:true,

   message:'Deposit completed',

   balance:account.balance
})
}catch(err){

   res.status(500).json({

      success:false,

      message:err.message
   })
}
}

}
module.exports=depositStripe