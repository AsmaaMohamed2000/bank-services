const express=require('express')
const {stripeWebhook} =require('../controllers/deposit.controller')
// const auth=require('../middlewares/authMiddleware')
const router=express.Router()

router.post('/webhook',express.raw({type:'application/json'}),stripeWebhook)
module.exports=router