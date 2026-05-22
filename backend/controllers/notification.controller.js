const notification=required('../models/Notifications.model.js')
const notificationController={
    getNotifications:async (req ,res)=>{
        try{
            const notifications= await notification.find({user:req.user._id}).sort({createdAt:-1})
  res.json(notifications)
            
        }catch(err){
             res.status(500).json({message:err.message})
        }
    },
     markAsRead:async (req ,res)=>{
        try{
         await notification.findByIdAndUpdate(req.params.id,{read:true})
         res.json({success:true})
  res.json(notifications)
            
        }catch(err){
             res.status(500).json({message:err.message})
        }
    },
}
module.exports=notificationController