import axiosInstance from "../api/axois"
export const getCards=async(user)=>{
    const res=await axiosInstance.post('/cards/getCards',user)
    return res.data

}
export const createCard=async(data)=>{
    const res=await axiosInstance.post('/cards/createCard',data)
    return res.data

}
export const freese=async(user,id)=>{
    const res=await axiosInstance.post(`/cards/freese/${id}`,user)
    return res.data

}
export const block=async(user,id)=>{
    const res=await axiosInstance.post(`/cards/block/${id}`,user)
    return res.data

}

export const replace=async(user,id)=>{
    const res=await axiosInstance.post(`/cards/replace/${id}`,user)
    return res.data

}