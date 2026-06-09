import axiosInstance from "../api/axois"
export const createDepositSession = async(amount)=>{
   const res = await axiosInstance.post(
      '/deposit/create-session',
      { amount }
   )

   return res.data
}
export const verifyDeposit = async({amount,user})=>{

   const res = await axiosInstance.post(

      '/deposit/verify',

      {
         amount,user
      }
   )

   return res.data
}