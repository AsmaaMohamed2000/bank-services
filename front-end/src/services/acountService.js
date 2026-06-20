

import axiosInstance from '../api/axois'
export const createAcount=async({user,...rest})=>{
   
    const response=await axiosInstance.post('/account/create-account',{user,rest})
    return  response.data 
}
export const getAcount=async(user)=>{
   
    const response=await axiosInstance.post('/account/my-account',user)
    return  response.data 
}