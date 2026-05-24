const express=require('express')
const {getAllUsers,deleteuser, updateuserbalance} =require('../controllers/adminUser.controller')
const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.get('/',auth,getAllUsers)
router.delete('/:id',auth,deleteuser)
router.put('/:id/balance',auth,updateuserbalance)
module.exports=router