const express=require('express')
const {createCard,getCards} =require('../controllers/card.controller')
const auth=require('../middlewares/authMiddleware')
const router=express.Router()
router.post('/createCard',createCard)
router.post('/getCards',getCards)
module.exports=router