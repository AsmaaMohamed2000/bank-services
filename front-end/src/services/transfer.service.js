import { User } from "lucide-react"
import axiosInstance from "../api/axois"
export const transfer=async({amount,user,...rest})=>{
  let res
    if(rest.cardNumber){
      res=await axiosInstance.post('/transfer',{amount,user,cardNumber:rest.cardNumber})
   }else if (rest.accountNumber){
    res=await axiosInstance.post('/transfer',{amount,user,accountNumber:rest.accountNumber})

   }
    return res.data

}