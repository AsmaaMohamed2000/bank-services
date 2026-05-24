const express=require('express')
const {getAllTransactions} =require('../controllers/adminTransaction.controller')
const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.get('/',auth,getAllTransactions)
module.exports=router