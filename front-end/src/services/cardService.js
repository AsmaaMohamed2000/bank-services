import axiosInstance from "../api/axois"
export const getCards=async(user)=>{
    const res=await axiosInstance.post('/cards/getCards',user)
    return res.data

}
export const createCard=async(data)=>{
    const res=await axiosInstance.post('/cards/createCard',data)
    return res.data

}