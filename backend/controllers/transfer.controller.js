const transaction=require('../models/Transactions.model')
const User=require('../models/user')
const notification=require('../models/Notifications.model')
const  transferController={
    transfer:async (req ,res)=>{
  try{
      const {receiverEmail ,amount}=req.body
    const sender=await User.findById(req.user._id)
const receiver=await User.findOne({email:receiverEmail})
if(!receiver) return res.satus(404).json({message:'user not found '})
    if(sender.balance<amount) return res.satus(400).json({message:'balance not enough '})
        sender.balance-=Number(amount)
receiver.balance+=Number(amount)
await sender.save()
await receiver.save()
await transaction.create({
    user:sender._id,type:'transfer',amount,receiver:receiver.email
})
await notification.create({
    user:receiver._id,
    title:'حواله واردع',
   message:`balance received from ${sender.name || sender.email} about ${amount}`
})
await notification.create({
    user:sender._id,
    title:'حواله success ',
   message:`balance sent to  ${receiver.name || receiver.email} about ${amount}`
})
res.json({message:'sended success'})
  }catch(err){
    res.status(500).json({message:err.message})
  }
}
}
module.exports=transferController
