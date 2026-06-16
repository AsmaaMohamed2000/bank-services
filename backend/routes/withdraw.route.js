const express = require('express')
const router = express.Router()
const withdrawController=require('../controllers/withdraw.controller')
router.post('/',withdrawController. withdrawMoney)
module.exports=router