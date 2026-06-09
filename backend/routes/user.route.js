
const express = require('express')
const router = express.Router()
const authMiddlewar =require('../middlewares/authMiddleware')
const  userController =require('../controllers/user.controller')
router.get('/get-me',authMiddlewar.authMiddleware,userController.getMe)
module.exports=router