const Joi = require('joi')

const registerSchema = Joi.object({

  fullName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\u0600-\u06FF\s]+$/)
    .required()
    .messages({
      'string.empty':'Full name is required',
      'string.min':'Full name must be at least 3 characters',
      'string.max':'Full name must not exceed 50 characters',
      'string.pattern.base':'Full name contains invalid characters'
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      'string.email':'Invalid email format',
      'string.empty':'Email is required'
    }),

  password: Joi.string()
    .min(8)
    .max(128)
   
    .required()
    .messages({
      'string.min':'Password must be at least 8 characters',
      'string.pattern.base':
      'Password must contain uppercase, lowercase, number and special character'
    }),

  nationalId: Joi.string()
    .pattern(/^\d{14}$/)
    .required()
    .messages({
      'string.pattern.base':
      'National ID must be exactly 14 digits'
    }),

  phone: Joi.string()
    .pattern(/^01[0125]\d{8}$/)
    .required()
    .messages({
      'string.pattern.base':
      'Invalid Egyptian phone number'
    })

})
 const forgotPasswordSchema = Joi.object({

  email: Joi.string()
    .email()
    .required()

})
 const resetPasswordSchema = Joi.object({

  email: Joi.string()
    .email()
    .required(),

  code: Joi.string()
    .length(6)
    .pattern(/^\d+$/)
    .required(),

  newPassword: Joi.string()
    .min(8)
    .max(128)
    
    .required()

})
const loginSchema = Joi.object({

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required()

})
const verifyOtpSchema = Joi.object({

  email: Joi.string()
    .email()
    .required(),

  code: Joi.string()
    .length(6)
    .pattern(/^\d+$/)
    .required()

})
const editUserInfoSchema=Joi.object({
   fullName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\u0600-\u06FF\s]+$/)
    
    .messages({
    
      'string.min':'Full name must be at least 3 characters',
      'string.max':'Full name must not exceed 50 characters',
      'string.pattern.base':'Full name contains invalid characters'
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
   
    .messages({
      'string.email':'Invalid email format',
     
    }),
      phone: Joi.string()
    .pattern(/^01[0125]\d{8}$/)
    
    .messages({
      'string.pattern.base':
      'Invalid Egyptian phone number'
    })

})
module.exports={registerSchema,editUserInfoSchema,verifyOtpSchema,loginSchema,resetPasswordSchema,forgotPasswordSchema}