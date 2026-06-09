import axiosInstance from '../api/axois'
export const getMe=async()=>{
const result=await axiosInstance.post('/auth/refresh-token',{})
return result.data
}