const express = require('express')
const router = express.Router()
const validateSchemas=require('../validators/auth.validate')
const authController = require('../controllers/auth.controller')
const auth=require('../middlewares/authMiddleware')

router.post('/register',auth.validate(validateSchemas.registerSchema), authController.register)

router.post('/verify-otp',auth.validate(validateSchemas.verifyOtpSchema) ,authController.verifyOtp)

router.post('/login',auth.validate(validateSchemas.loginSchema) ,authController.login)

router.post('/refresh-token', authController.refreshToken)

router.post('/logout', authController.logout)

router.post('/forgot-password',auth.validate(validateSchemas.forgotPasswordSchema) ,authController.forgotPassword)

router.post('/reset-password',auth.validate(validateSchemas.resetPasswordSchema), authController.resetPassword)

module.exports = router