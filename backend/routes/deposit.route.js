const express=require('express')
const { createDepositSession,verifyDeposit} =require('../controllers/deposit.controller')
// const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.post('/create-session', createDepositSession)
router.post('/verify',verifyDeposit)
module.exports=router