import axiosInstance from "../api/axois"
export const getTransactions=async(user)=>{
    const res=await axiosInstance.post('/transactions/getTransactions',{user})
    return res.data

}