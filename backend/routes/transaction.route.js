const express=require('express')
const { getTransactions} =require('../controllers/transaction.controller')
const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.post('/getTransactions',getTransactions)

module.exports=router