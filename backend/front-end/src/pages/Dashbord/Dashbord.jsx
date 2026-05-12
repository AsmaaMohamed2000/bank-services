import { motion } from "framer-motion"
import { Wallet ,ArrowDownCircle,ArrowUpCircle} from "lucide-react"
import { useState } from "react"

function Dashbord() {
  const [loading,setLoading]=useState('')
    const [amount,setAmount]=useState(false)
      const [userBalance,setUserBalance]=useState(1200.5)
        const [cardBalance,setCardBalance]=useState(350.75)
  const user={
    name:'asmaa'
  }
  const handleStripeDeposite=()=>{
    if(!amount|| Number(amount)<=0 ||isNaN(amount)){
      alert('please enter correct amount')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setUserBalance((prev)=>prev+Number(amount))
      setAmount('')
      setLoading(false)
      alert(`${amount} withdraw in your account successfully`)
    }, (1200));
  }
  const handleTransaction=(type)=>{
      if(!amount|| Number(amount)<=0 ||isNaN(amount)){
      alert('please enter correct amount')
      return
    }
    const amount=Number(amount)
    setLoading(true)
    setTimeout(() => {
      switch(type){
        case 'withdraw' :
          if(userBalance>=amount){
            setUserBalance((prev)=>prev-amount)
            alert(`${amount} withdraw successfuly`)

          }else{
            alert('userbalance not enough')
          }
          break;
          case 'to-card' :
            if(userBalance>=amount){
               setUserBalance((prev)=>prev-amount)
               setCardBalance((prev)=>prev+amount)
                alert(`${amount} to card  successfuly`)

            }else{
            alert('userbalance not enough')
          }
          break;
          case 'to-account' :
            if(cardBalance>=amount){
                setUserBalance((prev)=>prev+amount)
               setCardBalance((prev)=>prev-amount)
               alert(`${amount} to balance successfuly`)

            }else{
            alert('userbalance not enough')
          }
          break;
          default :
          alert('type  operation unknown')
      }
      setLoading(false)
      setAmount('')
    }, 1000);
  }
  return (
    <div className="pt-24  p-6 relative w-full min-h-screen flex items-center justify-center bg-linear-to-br  from-[#0a0f1f] via-[#1a237e] to-[#3f51b5]">
       <motion.div initial={{y:40,opacity:0}} animate={{opacity:1,y:0}} transition={{duration:1}}
       className="w-full py-2 px-7 max-w-[380px] sm:max-w-3xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl text-white ">
<div className="text-center mb-10 ">
<div className="w-24 h-24 mx-auto bg-linear-to-tr from-yellow-400 to-purple-400  rounded-full flex items-center justify-center mb-4 shadow-lg">
<Wallet size={42}/>
</div>
<h2 className="text-3xl font-extrabold tracking-wide">Welcome {user?.name || 'User' } </h2>

  <p className="text-gray-300 mt-2">Manage your bank account easily and securely </p>

</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8 ">
<motion.div className="bg-linear-to-r from-purple-700/60 to-pink-500/50 p-6 rounded-2xl text-center shadow-lg ">
<h3 className="text-lg text-gray-200 ">Account Balance </h3>
<p className="text-3xl font-bold mt-2 text-yellow-300"> $ {userBalance.toFixed(2)}</p>
</motion.div>
<motion.div className="bg-linear-to-r from-blue-700/60 to-cyan-500/50  p-6 rounded-2xl text-center">
<h2 className="text-3xl font-extrabold tracking-wide">Welcome {user?.name || 'User' } </h2>

  <p className="text-gray-300 mt-2">Manage your bank account easily and securely </p>

</motion.div>
</div>
<input type="number" className="w-full mb-6 rounded-xl bg-white/10  border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 px-5 py-2 outline-none" placeholder="Enter Amount" value={amount} onChange={(e)=>setAmount(e.target.value )}/>
<div className="flex flex-col sm:flex-row flex-wrap max-w-[80%] mx-auto justify-center gap-6 mb-8 ">
<button onClick={handleStripeDeposite} disabled={loading}
className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600  py-3 px-3 sm:px-8 rounded-xl font-bold text-white transition"
>

 {loading?'...':'Deposite through stripe'}  
</button>
<button onClick={()=>handleTransaction('withdraw')}
className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600  py-3 px-3 sm:px-8 rounded-xl font-bold text-white transition"
disabled={loading}>  {loading?'...':'withdraw'}  
</button>
<button onClick={()=>handleTransaction('to-card')}
className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600  py-3 px-3 sm:px-8 rounded-xl font-bold text-white transition"
disabled={loading}> {loading?'...':'Transfer to card '}  
</button>
<button onClick={()=>handleTransaction('to-account')}
className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600  py-3 px-3 sm:px-8 rounded-xl font-bold text-white transition"
disabled={loading}> {loading?'...':'transfer to account'}  
</button>
</div>
       </motion.div>
    </div>
  )
}

export default Dashbord
