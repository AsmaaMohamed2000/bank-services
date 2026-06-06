const express = require('express')
const router = express.Router()
const accountController =require('../controllers/acount.controller')
router.post('/create-account',accountController.createAccount)
module.exports=router