const express=require('express')
const {getMe,  updateProfile} =require('../controllers/user.controller')
const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.get('/',auth,getMe)
router.put('/update',auth,updateProfile)
module.exports=router