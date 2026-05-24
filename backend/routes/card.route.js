const express=require('express')
const {createCard,getMyCard} =require('../controllers/card.controller')
const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.post('/',auth,createCard)
router.get('/',auth,getMyCard)
module.exports=router