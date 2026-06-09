const authService = require('../services/auth.service')

const authController = {

    register: async (req, res) => {
        try {

            const result = await authService.register(req.body)

            res.status(201).json(result)

        } catch (error) {

            res.status(400).json({
                success: false,
                type:'bussiness',
                message: error.message,
                errors:[]
            })
        }
    },

    verifyOtp: async (req, res) => {
        try {

            const result = await authService.verifyOtp(req.body)

            res.status(200).json(result)

        } catch (error) {

            res.status(400).json({
               success: false,
                type:'bussiness',
                message: error.message,
                errors:[]
            })
        }
    },

   
    login: async (req, res) => {
        try {

            const {
      success,
      message,
      access_token,
      user,
      refresh_token
    } = await authService.login({...req.body,ip:req.ip,device:req.headers['sec-ch-ua-platform']||'unknown device'})

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: false, 
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7
            })

            res.status(200).json({
      success,
      message,
      access_token,
      user,
      
    })

        } catch (error) {

            res.status(400).json({
               success: false,
                type:'bussiness',
                message: error.message,
                errors:[]
            })
        }
    },

    
    forgotPassword: async (req, res) => {
        try {

            const result = await authService.forgotPassword(req.body)

            res.status(200).json(result)

        } catch (error) {

            res.status(400).json({
                 success: false,
                type:'bussiness',
                message: error.message,
                errors:[]
            })
        }
    },

    resetPassword: async (req, res) => {
        try {

            const result = await authService.resetPassword(req.body)

            res.status(200).json(result)

        } catch (error) {

            res.status(400).json({
                  success: false,
                type:'bussiness',
                message: error.message,
                errors:[]
            })
        }
    },
    refreshToken:async (req,res)=>{
        try{
const tokens=await authService.regenerateAccessToken(req.cookies.refresh_token)
res.cookie('refresh_token',tokens.newRefreshToken,{
    httpOnly:true,sameSite:'strict',secure:false
})
res.status(200).json({
    success:true,accessToken:tokens.newAccessToken ,user:tokens.user
})
        }catch(err){
              res.status(400).json({
                success: false,
                message: err.stack
            })
        }
    },
    logout:async(req,res)=>{
          try{
const result=await authService.logout(req.cookies.refresh_token)
res.clearCookie('refresh_token')
res.status(200).json(result)
        }catch(err){
              res.status(401).json({
                success: false,
                message: err.message
            })
        }
    }

}

module.exports=authController