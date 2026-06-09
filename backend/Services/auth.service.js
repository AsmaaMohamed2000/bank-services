
// const User = require('../models/user.model')
// const Otp = require('../models/otp.model')

// const sendEmail=require('../utilities/sendEmail')

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const crypto = require('crypto')

// const authService = {
//     register: async(data)=>{

//         const {
//             fullName,
//             email,
//             password,
//             nationalId,
//             phone
//         } = data

//         const existingEmail =
//         await User.findOne({ email })

//         if(existingEmail){
//             throw new Error(
//                 'Email already exists'
//             )
//         }

//         const existingNationalId =
//         await User.findOne({ nationalId })

//         if(existingNationalId){
//             throw new Error(
//                 'National ID already exists'
//             )
//         }

//         const user = await User.create({
//             fullName,
//             email,
//             password,
//             nationalId,
//             phone
//         })

//         const plainOtp = crypto
//         .randomInt(100000,999999)
//         .toString()

//         const hashedOtp =
//         await bcrypt.hash(plainOtp,10)

//         await Otp.create({
//             user:user._id,
//             code:hashedOtp,
//             type:'verify-email',
//             expiresAt:
//             Date.now() + 5 * 60 * 1000
//         })

//         await sendEmail(
//    user.email,
//    plainOtp)


//         return {
//             success:true,
//             message:'Account created successfully',
//             user
//         }

//     },

//     verifyOtp: async(data)=>{

//         const { email, code } = data

//         const user =
//         await User.findOne({ email })

//         if(!user){
//             throw new Error('User not found')
//         }

//         const otp = await Otp.findOne({
//             user:user._id,
//             type:'verify-email',
//             verified:false
//         }).sort({ createdAt:-1 })

//         if(!otp){
//             throw new Error('OTP not found')
//         }

//         if(otp.expiresAt < new Date()){
//             throw new Error('OTP expired')
//         }

//         const validOtp =
//         await bcrypt.compare(code,otp.code)

//         if(!validOtp){
//             throw new Error('Invalid OTP')
//         }

//         otp.verified = true
//         await otp.save()

//         user.isVerified = true
//         await user.save()
//        await Otp.deleteMany({
//     user: user._id,
//     type: 'verify-email'
// })

//         return {
//             success:true,
//             message:'Email verified successfully'
//         }

//     },

   
//     login: async(data)=>{

//         const { email,password } = data

//         const user = await User
//         .findOne({ email })
//         .select('+password')

//         if(!user){
//             throw new Error(
//                 'Invalid email or password'
//             )
//         }

//         const validPassword =
//         await user.matchPassword(password)

//         if(!validPassword){
//             throw new Error(
//                 'Invalid email or password'
//             )
//         }

//         if(user.isBlocked){
//             throw new Error(
//                 'Account is blocked'
//             )
//         }

//         if(!user.isVerified){
//             throw new Error(
//                 'Please verify your email first'
//             )
//         }

//         const token = jwt.sign(
//             {
//                 id:user._id,
//                 role:user.role
//             },
//             process.env.SECRET_KEY,
//             {
//                 expiresIn:'2d'
//             }
//         )

//         return {
//             success:true,
//             message:'Login successful',
//             token,
//             user
//         }

//     },

 
//     forgotPassword: async(data)=>{

//         const { email } = data

//         const user =
//         await User.findOne({ email })

//         if(!user){
//             throw new Error('User not found')
//         }

//         const plainOtp = crypto
//         .randomInt(100000,999999)
//         .toString()

//         const hashedOtp =
//         await bcrypt.hash(plainOtp,10)

//         await Otp.create({
//             user:user._id,
//             code:hashedOtp,
//             type:'reset-password',
//             expiresAt:
//             Date.now() + 5 * 60 * 1000
//         })

//             await sendEmail(
//    user.email,
//    plainOtp)

//         return {
//             success:true,
//             message:'OTP sent successfully'
//         }

//     },
//     resetPassword: async(data)=>{

//         const {
//             email,
//             code,
//             newPassword
//         } = data

//         const user =
//         await User.findOne({ email })

//         if(!user){
//             throw new Error('User not found')
//         }

//         const otp = await Otp.findOne({
//             user:user._id,
//             type:'reset-password',
//             verified:false
//         }).sort({ createdAt:-1 })

//         if(!otp){
//             throw new Error('OTP not found')
//         }

//         if(otp.expiresAt < new Date()){
//             throw new Error('OTP expired')
//         }

//         const validOtp =
//         await bcrypt.compare(code,otp.code)

//         if(!validOtp){
//             throw new Error('Invalid OTP')
//         }

//         otp.verified = true
//         await otp.save()

//         user.password = newPassword
//         await user.save()
//      await Otp.deleteMany({
//     user: user._id,
//     type: 'reset-password'
// })

//         return {
//             success:true,
//             message:'Password reset successfully'
//         }

//     }

// }

// module.exports=authService
const User = require('../models/user.model')
const Otp = require('../models/Otp.model')

const sendEmail = require('../utilities/sendEmail')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const console = require('console')

const authService = {

  register: async (data) => {
    const {
      fullName,
      email,
      password,
      nationalId,
      phone
    } = data

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      throw new Error('Email already exists')
    }

    const existingNationalId = await User.findOne({ nationalId })
    if (existingNationalId) {
      throw new Error('National ID already exists')
    }

    const user = await User.create({
      fullName,
      email,
      password,
      nationalId,
      phone
    })

    const plainOtp = crypto.randomInt(100000, 999999).toString()

    const hashedOtp = await bcrypt.hash(plainOtp, 10)

 const otpp=   await Otp.create({
      user: user._id,
      code: hashedOtp,
      type: 'verify-email',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    })

    await sendEmail(user.email, plainOtp)

    return {
      success: true,
      message: 'Account created successfully',
      user 
    }
  },


  verifyOtp: async (data) => {
    const { email, code } = data

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    const otp = await Otp.findOne({
      user: user._id,
      type: 'verify-email'
    }).sort({ createdAt: -1 })

    if (!otp) {
      throw new Error('OTP not found')
    }

    if (otp.expiresAt < new Date()) {
      throw new Error('OTP expired')
    }

    const validOtp = await bcrypt.compare(code, otp.code)

    if (!validOtp) {
      throw new Error('Invalid OTP')
    }

    user.isVerified = true
    await user.save()

    await Otp.deleteMany({
      user: user._id,
      type: 'verify-email'
    })

    return {
      success: true,
      message: 'Email verified successfully'
    }
  },


  login: async (data) => {
    const { email, password ,ip,device} = data

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const validPassword =await user.matchPassword(password)

    if (!validPassword) {
      throw new Error('Invalid email or password')
    }

    if (user.isBlocked) {
      throw new Error('Account is blocked')
    }

    if (!user.isVerified) {
      throw new Error('Please verify your email first')
    }

    const access_token = await user.generateAccessToken()
    const refresh_token=await user.generateRefreshToken({ip,device})

    return {
      success: true,
      message: 'Login successful',
      access_token,
      user,
      refresh_token
    }
  },


  forgotPassword: async (data) => {
    const { email } = data

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    const plainOtp = crypto.randomInt(100000, 999999).toString()

    const hashedOtp = await bcrypt.hash(plainOtp, 10)

    await Otp.create({
      user: user._id,
      code: hashedOtp,
      type: 'reset-password',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    })

    await sendEmail(user.email, plainOtp)

    return {
      success: true,
      message: 'OTP sent successfully'
    }
  },


  resetPassword: async (data) => {
    const { email, code, newPassword } = data

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    const otp = await Otp.findOne({
      user: user._id,
      type: 'reset-password'
    }).sort({ createdAt: -1 })

    if (!otp) {
      throw new Error('OTP not found')
    }

    if (otp.expiresAt < new Date()) {
      throw new Error('OTP expired')
    }

    const validOtp = await bcrypt.compare(code, otp.code)

    if (!validOtp) {
      throw new Error('Invalid OTP')
    }

    
    user.password = newPassword
    user.tokens=[]
    await user.save()

    await Otp.deleteMany({
      user: user._id,
      type: 'reset-password'
    })

    return {
      success: true,
      message: 'Password reset successfully'
    }
  },
 regenerateAccessToken: async(token)=>{

   if(!token){

      throw new Error('No refresh token')
   }
let decoded
 try{
    decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN
   )
 }catch(err){
  throw new Error('refresh token expired')
 }

   const user = await User.findById(decoded.id)

   if(!user){

      throw new Error('User not found')
   }

   let matchedToken = null

   for(const item of user.tokens){

      const isMatch = await bcrypt.compare(
         token,
         item.token
      )

      if(isMatch){

         matchedToken = item
         break
      }
   }

   if(!matchedToken){

      throw new Error('Invalid refresh token')
   }

   const newAccessToken =
      await user.generateAccessToken()
    const newRefreshToken=await user.generateRefreshToken({ip:matchedToken?.ip,device:matchedToken?.device})
    user.tokens=user.tokens.filter((item)=>(
      item._id.toString()!==matchedToken._id.toString()
    ))
    await user.save()

   return {newAccessToken ,newRefreshToken ,user}
},
logout:async(token)=>{
  
   if(!token){

      throw new Error('No refresh token')
   }
let decoded
 try{
    decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN
   )
 }catch(err){
  throw new Error('refresh token expired')
 }

   const user = await User.findById(decoded.id)

   if(!user){

      throw new Error('User not found')
   }

   let matchedToken = null

   for(const item of user.tokens){

      const isMatch = await bcrypt.compare(
         token,
         item.token
      )

      if(isMatch){
        matchedToken=item

       
         break
      }
   }

   if(!matchedToken){

      throw new Error('Invalid refresh token')
   }
   user.tokens=user.tokens.filter((item)=>(
      item._id.toString()!==matchedToken._id.toString()
    ))
  
    await user.save()


   return {success:true}

}

}

module.exports = authService