import { motion } from "framer-motion"
import { Wallet ,ArrowDownCircle,ArrowUpCircle} from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { getAcount } from "../../services/acountService"
import { createDepositSession } from "../../services/deposit"
import { withdraw } from "../../services/withdraw.service"
import { transfer } from "../../services/transfer.service"
function Dashbord() {
  const user=useSelector(state=>state.auth.user)
  const [loading,setLoading]=useState('')
    const [amount,setAmount]=useState('')
      const [type,setType]=useState(null)
      const [userBalance,setUserBalance]=useState(null)
        const [number,setNumber]=useState(null)
        const [accountNumber,setAccountNumber]=useState(null)
useEffect(()=>{
 if (!user){
      return
    }
    const getAccounts=async()=>{
        try{
          const res=await getAcount(user)
         
          const totalBalance=res.accounts.reduce((sum,curr)=>sum+Number(curr.balance)

          ,0)
          setUserBalance(totalBalance)


      }catch(err){
        toast.error(err.response.data.message)
      }
    }
    getAccounts()
   
},[user])
 const handleDeposit = async()=>{

   if(!amount || Number(amount) <= 0){
      return toast.error('Invalid amount')
   }

   try{

      const res = await createDepositSession({amount,user})

      window.location.href = res.session_url

   }catch(err){

      toast.error(err.response?.data?.message)

   }
}
  const handleWithdraw=async()=>{
      if(!amount|| Number(amount)<=0 ||isNaN(amount)){
      alert('please enter correct amount')
      return
    }
   
    try{
      const res=await withdraw({amount,user})
      setUserBalance(res.balance)
      
    }catch(err){
      console.log(err.response.data.message)
    }finally{
      setLoading(false)
      setAmount('')
    }
  
  
  
  
  
  }
  const handleTransfer=async(type)=>{
 if(!amount|| !number || Number(amount)<=0 ){
      alert('please enter correct information')
      return
    }
    switch(type){
      case 'to-card':
        try{
          const res=await transfer({amount,user,cardNumber:number})
          setUserBalance(res.balance)
          toast.success('transfered successfully')
        }catch(err){
          toast.error(err.response.data.message)
        }
        break;
      case 'to-account':
           try{
          const res=await transfer({amount,user,accountNumber:number})
          setUserBalance(res.balance)
          toast.success('transfered successfully')
        }catch(err){
          alert(err.response.data.message)
          toast.error('transfere failed')
        }finally{
          setType(null)
        }
        break;
default:
  break


    }
  }
    
  return (
    <div className="pt-24  p-6 relative w-full min-h-screen flex items-center justify-center bg-linear-to-br  from-[#0a0f1f] via-[#1a237e] to-[#3f51b5]">
       <motion.div initial={{y:40,opacity:0}} animate={{opacity:1,y:0}} transition={{duration:1}}
       className="w-full py-2 px-7 max-w-[380px] sm:max-w-3xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl text-white ">
<div className="text-center mb-10 ">
<div className="w-24 h-24 mx-auto bg-linear-to-tr from-yellow-400 to-purple-400  rounded-full flex items-center justify-center mb-4 shadow-lg">
<Wallet size={42}/>
</div>
<h2 className="text-3xl font-extrabold tracking-wide">Welcome {user?.fullName|| 'User' } </h2>

  <p className="text-gray-300 mt-2">Manage your bank account easily and securely </p>

</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8 ">
<motion.div className="bg-linear-to-r from-purple-700/60 to-pink-500/50 p-6 rounded-2xl text-center shadow-lg ">
<h3 className="text-lg text-gray-200 ">Account Balance </h3>
<p className="text-3xl font-bold mt-2 text-yellow-300"> $ {userBalance?.toFixed(2)}</p>
</motion.div>
<motion.div className="bg-linear-to-r from-blue-700/60 to-cyan-500/50  p-6 rounded-2xl text-center">
<h2 className="text-3xl font-extrabold tracking-wide">Welcome {user?.fullName|| 'User' } </h2>

  <p className="text-gray-300 mt-2">Manage your bank account easily and securely </p>

</motion.div>
</div>
<input type="number" className="w-full mb-6 rounded-xl bg-white/10  border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 px-5 py-2 outline-none" placeholder="Enter Amount" value={amount} onChange={(e)=>setAmount(e.target.value )}/>
<div className="flex flex-col sm:flex-row flex-wrap max-w-[80%] mx-auto justify-center gap-6 mb-8 ">
<button onClick={handleDeposit} disabled={loading}
className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600  py-3 px-3 sm:px-8 rounded-xl font-bold text-white transition"
>

 {loading?'...':'Deposite through stripe'}  
</button>
<button onClick={handleWithdraw}
className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600  py-3 px-3 sm:px-8 rounded-xl font-bold text-white transition"
disabled={loading}>  {loading?'...':'withdraw'}  
</button>
<button onClick={()=>setType('to-card')}
className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600  py-3 px-3 sm:px-8 rounded-xl font-bold text-white transition"
disabled={loading}> {loading?'...':'Transfer to card '}  
</button>
<button onClick={()=>setType('to-account')}
className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600  py-3 px-3 sm:px-8 rounded-xl font-bold text-white transition"
disabled={loading}> {loading?'...':'transfer to account'}  
</button>

</div>

       </motion.div>
       {type&&(
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 ">
<div className=" w-full max-w-2xl rounded-3xl bg-[#162569] border border-white/20 p-8 shadow-2xl text-white ">
<div className="flex justify-end mb-6 ">
    <button
          onClick={() => setType(null)}
          className="text-3xl cursor-pointer hover:text-red-400 text-white/60"
        >
          ×
        </button>
</div>
<form onSubmit={(e)=>{e.preventDefault() 
  handleTransfer(type)}} >
  <div className="mb-7  flex">
    <label htmlFor="amount" className="text-white/70 text-sm me-5">Amount</label>
    <input type="text" className="outline-none border border-1 border-blue-300/50 rounded-md  flex-1 py-1 px-2 placeholder-white/50 text-white/70" placeholder="enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
  </div>
   <div  className="mb-7 flex">
    <label htmlFor="cardNumber" className="text-white/70 text-sm me-5">Account/Card Number</label>
    <input type="text" className="outline-none border border-1 border-blue-300/50 rounded-md  flex-1 py-1 px-2 placeholder-white/50 text-white/70" placeholder="enter Account or Card Number" value={number} onChange={(e)=>setNumber(e.target.value)}/>
  </div>
    {/* <div  className="mb-7 flex ">
    <label htmlFor="AccountNumber" className="text-white/70 text-sm me-5">Card Number</label>
    <input type="text" className="outline-none border border-1 border-blue-300/50 rounded-md  flex-1 py-1 px-2 placeholder-white/50 text-white/70" placeholder="enter Card Number" value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)}/>

  </div> */}
   <button type="submit"  className="bg-blue-700 px-2 py-1 w-full rounded-3xl  cursor-pointer hover:bg-blue-400/60 text-white">transfer</button>
</form>
</div>
  </div>
)}
    </div>
  )
}

export default Dashbord
