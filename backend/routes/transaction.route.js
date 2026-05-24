const express=require('express')
const {deposit,withdraw , getTransactions} =require('../controllers/transaction.controller')
const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.get('/',auth,getTransactions)
router.post('/deposit',auth,deposit)
router.post('/withdraw',auth,withdraw)
module.exports=router