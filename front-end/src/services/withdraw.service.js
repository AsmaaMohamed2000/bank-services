import axiosInstance from "../api/axois"
export const withdraw=async({user,amount})=>{
    const res=await axiosInstance.post('/withdraw',{user ,amount})
    return res.data

}