// const User=require('../models/User.model')
// const Cart=require('../models/Card.model')
// const userController={
//     getMe:async (req,res)=>{
//         try{
// const user=await User.findById(req.user._id)
// if(!user) return res.status(404).json({message:'User not found'})
//     let cart=await Cart.findOne({user:req.user._id})
// cart=cart?{balance:cart.balance,cartNumber:cart.cartNumber,CVV:cart.CVV,expiryDate:cart.expiryDate}:null
// res.json({
//     ...user.toObject(),
// cart
// })
//         }catch(error){
// res.status(404).json({message:error.message})
//         }
//     },
//     updateProfile: async(req,res)=>{
// try{
//     const {name,email}=req.body
// const user=await User.findById(req.user._id)
// if(!user) return res.status(404).json({message:'User not found'})
// if(email&&email!==user.email)
// const  exsisting=await User.findOne({email})
// if (exsisting) return  res.status(400).json({message:''})
// if(name) user.name=name
// if(email) user.email=email
// await user.save()
// res.json(
//     {
//         user:{
//         id:user._id,
//         name:user.name,
//         email:user.email
    
// },
// message:'profile updated successfully '
//     }
// )
// }
// catch(err){
//     res.status(404).json({message:err.message})
// }
//     }

// }
// module.exports=userController