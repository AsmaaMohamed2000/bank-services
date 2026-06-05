import axiosInstance from '../api/axois'

export const registerUser = async(data)=>{

   const response = await axiosInstance.post(
      '/auth/register',
      data
   )

   return response.data}

   export const loginUser = async(data)=>{
   const response = await axiosInstance.post(
      '/auth/login',
      data
   )

   return response.data}
     export const verifyOtp = async(data)=>{
   const response = await axiosInstance.post(
      '/auth/verify-otp',
      data
   )

   return response.data}
  
     export const  forgotPassword = async(data)=>{
   const response = await axiosInstance.post(
      '/auth/forgot-password',
      data
   )

   return response.data}
  
      export const   resetPassword = async(data)=>{
   const response = await axiosInstance.post(
      '/auth/reset-password',
      data
   )

   return response.data}