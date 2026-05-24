const express=require('express')
const {transfer} =require('../controllers/transfer.controller')
const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.post('/',auth,transfer)

module.exports=router