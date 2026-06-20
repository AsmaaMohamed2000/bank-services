import axiosInstance from "../api/axois"
export const createDepositSession = async({amount,user})=>{
   const res = await axiosInstance.post(
      '/deposit/create-session',
      { amount ,user}
   )

   return res.data
}
export const ckeckDeposit = async(sessionId)=>{

   const res = await axiosInstance.get(

      `/deposit/status/${sessionId}`,

   )

   return res.data
}