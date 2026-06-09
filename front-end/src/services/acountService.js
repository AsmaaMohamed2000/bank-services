

import axiosInstance from '../api/axois'
export const createAcount=async(user)=>{
   
    const response=await axiosInstance.post('/account/create-account',user)
    return  response.data 
}
export const getAcount=async(user)=>{
   
    const response=await axiosInstance.post('/account/my-account',user)
    return  response.data 
}