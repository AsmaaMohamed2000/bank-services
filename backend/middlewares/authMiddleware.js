const jwt=require('jsonwebtoken')
const user=require('../models/user')
const authMiddleware=async(req,res,next)=>{
     let token
    if(req.headers.authorization && req.headers.authorization.startswith('Bearer')) {
   try{
            token=req.headers.authorization.split('')[1]
            if(!token) return  res.status(401).json({message:'unAuthorized'})
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await user.findById(decoded.id)
            next()
        }catch(err){
            res.status(401).json({message:err.message})
        }
   }}
module.exports=authMiddleware