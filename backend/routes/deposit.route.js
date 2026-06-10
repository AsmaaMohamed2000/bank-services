const express=require('express')
const { createDepositSession,stripeWebhook} =require('../controllers/deposit.controller')
// const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.post('/create-session', createDepositSession)
// router.post('/webhook',express.raw({type:'application/json'}),stripeWebhook)
module.exports=router