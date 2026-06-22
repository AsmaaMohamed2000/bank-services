import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import {  CreditCard,RefreshCw,Plus} from 'lucide-react'
import { useSelector } from "react-redux";
import { getAcount } from "../../services/acountService";
import { toast } from "react-toastify";
import { getCards,createCard ,freese,block,replace} from "../../services/cardService";
import { space } from "postcss/lib/list";
function MyCard() {
    const user = useSelector(state=>state.auth.user)
    const [cards, setCard] = useState([]);
    const [flipped, setFlipped] = useState(false);
    const [msg, setMsg] = useState('');
    const [modal,setModal]=useState(false)
    const [accounts,setAccounts]=useState([])
    const [accountType,setAccountType]=useState('')
    const [accountID,setAccountID]=useState('')
  const formatCardNumber=(num)=>{
    if(!num) return '------------------'
    const formatted=String(num).replace(/\D/g,'')
    return formatted.replace(/(\d{4})(?=\d)/g,'$1 ')
  }
  useEffect(()=>{
const getAllCards=async()=>{
  if(!user) return
   try{
const result=await getCards(user)
setCard(result.cards)
  }catch(err){
toast.error(err.response.data.message)
  }
}
getAllCards()
  },[user])
  const getCard=async()=>{}
  const openModal=async()=>{
    if(!user) return
   
      try{
             const res=await getAcount(user)
             setAccounts(res.accounts)
              setModal(true)
             console.log(accounts)
   
   
         }catch(err){
           toast.error(err.response.data.message)}
         

  }
   const create=async()=>{
    if(!accountID) return toast.error('pleade choose account number')
      console.log(accountID)
    try{
const res=await createCard({user,accountID})
if (res.success){
  try{
const result=await getCards(user)
setCard(result.cards)
  }catch(err){
toast.error(err.response.data.message)
  }
}
    }catch(err){
toast.error(err.response.data.message)
    }finally{
      setModal(false)
    }
   }
   const freeseCard=async(cardId)=>{
    if(!user||!cardId) return
    try{
      const res=await freese(user,cardId)
      try{
const result=await getCards(user)
setCard(result.cards)
  }catch(err){
toast.error(err.response.data.message)
  }}catch(err){
    toast.error(err.response.data.message)
  }
    }
    const blockCard=async(cardId)=>{
    if(!user||!cardId) return
    try{
      const res=await block(user,cardId)
      try{
const result=await getCards(user)
setCard(result.cards)
  }catch(err){
toast.error(err.response.data.message)
  }}catch(err){
    toast.error(err.response.data.message)
  }
    }
   const replaceCaed=async(id)=>{
      if(!user||!id) return
    try{
      const res=await replace(user,id)
      try{
const result=await getCards(user)
setCard(result.cards)
  }catch(err){
toast.error(err.response.data.message)
  }}catch(err){
    toast.error(err.response.data.message)
  }
   }
  return (
    <div className="pt-24 min-h-screen w-full bg-linear-to-br from-[#0a0f1f]  via-[#101a3a] to-[#1a237e] relative overflow-hidden flex  flex-col items-center justify-between  text-white relative overflow-hidden">
      <div className="md:w-full max-w-xl w-[300px] sm:w-[500px]">
<div className="flex justify-between items-center mt-12 mb-6">
<h2 className="text-white text-md sm:text-2xl font-extrabold flex items-center gap-3">
  <CreditCard/> default card
</h2>
<div className="flex flex-col sm:flex-row gap-4">
{/* <button onClick={getCard} className="flex items-center sm:gap-2 gap-1 bg-white/10 hover:bg-white/20 text-white px-1 py-2 sm:px-3 sm:py-2 rounded-md " title="update"><RefreshCw size={16}/> update</button> */}
<button onClick={openModal} className="flex cursor-pointer items-center sm:gap-2 gap-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-1 py-2 sm:px-3 sm:py-2 rounded-md  " title="create card"><Plus size={16}/> create card</button>
</div>
      </div>
     <div className="">
   
{cards&&cards.length>=1?cards.map((item)=>(
   <div className="mt-8 perspective-distant ">
  
 {item.status==='blocked'&&item.isReplaced&&(
  <>
   <span className="me-3">replaced</span>
   <span className={`w-4 h-4 rounded-full bg-red-600`}></span>
 
 
  <span>blocked</span>
</>
 )}
  <div className="">
 
   <div className={`flex gap-6 mb-6 items-center ${item.status!=='blocked'?'flex':'hidden'}` }>
        <button onClick={()=>freeseCard(item._id)} className="flex items-center sm:gap-2 gap-1 bg-white/10 hover:bg-white/20 text-white px-1 py-2 sm:px-3 sm:py-2 rounded-md "><RefreshCw size={16}/> {item.isFrozen?'unFreese card':'freese card'}</button>
<button onClick={()=>blockCard(item._id)} className="flex cursor-pointer items-center sm:gap-2 gap-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-1 py-2 sm:px-3 sm:py-2 rounded-md "><Plus size={16}/> {item.status==='active'?'block':''} </button>
<div className="flex gap-3 items-center">
  <span className={`w-4 h-4 rounded-full ${item.status==='active'?'bg-green-600':item.status==='blocked'?'bg-red-600':'bg-yellow-500'}`}></span>
  <span>{item.status}</span>
</div>
      </div>
      <div className={`flex gap-6 mb-6 items-center ${item.status==='blocked'&&!item.isReplaced?'flex':'hidden'}` }>
        <button onClick={()=>replaceCaed(item._id)} className="flex items-center sm:gap-2 gap-1 bg-white/10 hover:bg-white/20 text-white px-1 py-2 sm:px-3 sm:py-2 rounded-md " ><RefreshCw size={16}/> replace</button>

      </div>
<motion.div onClick={()=>setFlipped((prev)=>!prev)} animate={{rotateY:flipped?180:0}}
  transition={{duration:1}} style={{transformStyle:'preserve-3d'}} className="cursor-pointer select-none"
  >
    
<div className="relative flex flex-col rounded-2xl p-3 sm:p-6 pb-12 text-white h-64 bg-linear-to-r from-indigo-600  via-purple-600 to-pink-500 " style={{backfaceVisibility:'hidden'}}>
<div className="flex justify-between items-start ">
<div className="flex items-center gap-3">
<svg width={'26'} height={'18'} fill="none" viewBox="0 0 48 32" xmlns="https://www.w3.org/2000/svg">
<circle cx={'16'} cy={'16'} r={'8'} fill="white" opacity={'0.9'}/>
<circle cx={'32'} cy={'16'} r={'8'} fill="white" opacity={'0.6'}/>
</svg>
<div className="text-sm text-white/90">
NeoBank  VISA
</div>
</div>
<div className="text-right text-xs ">
<div className="text-white/80">available</div>
<div className="font-semibold">{item?.expiryDate ??'--/--'}</div>
</div>

</div>
<div className="text-2xl tracking-widest mt-4 font-mono">
{formatCardNumber(item?.cardNumber)}
</div>
<div className="mt-6 flex justify-between  flex-1">
<div className="text-sm self-end">
<div className="text-white/80">user</div>
<div className="font-semibold">{user?.fullName ?? user?.email ??'--/--'}</div>
</div>
<div className="text-right text-sm self-end">
<div className="text-white/80">card balance</div>
<div className="font-semibold">{item?.balance?.toFixed(2) ??'0.00'}</div>
</div>
</div>
</div>


{/* <div className="absulute -bottom-8 -left-12 w-40 h-40 bg-white/5 rounded-full blur-3xl"/>
<div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"/> */}
{/*back */}
<div style={{backfaceVisibility:'hidden',transform:'rotateY(180deg)'}} className="absolute top-0 left-0 w-full rounded-2xl p-6  text-black h-64  bg-linear-to-r from-gray-200 to-gray-300">
<div className="h-10 bg-black/85 rounded-sm"/>
<div className="mt-4 flex justify-between items-center ">
<div className="w-2/3  ">
 <div className="text-xs text-gray-700 mb-1">CVV</div>
                  <div className="bg-white p-2 rounded-md w-max tracking-widest font-mono">
                    {item?.CVV ?? "*"}
                  </div>
</div>
 <div className="text-xs text-right">
                  <div className="text-gray-600">expired</div>
                  <div className="font-semibold">
                    {item?.expiryDate ?? "--/--"}
                  </div>
                </div>
</div>
<div className="mt-6 text-sm text-gray-600">
<div className="mb-2 font-medium">safe notes</div>
<ul className="space-y-1 pl-5 list-disc">
<li> dont share card number or cvv</li>
<li>use card for try only</li>
</ul>
</div>
<div className="absolute bottom-6 right-6 text-xs text-gray-500 font-extrabold">
NeoBan   2026
</div>
</div>
</motion.div>
{msg&&(
  <div className="text-gray-300 text-sm mt-4 text-center">
    {msg}
  </div>
)}
<div className="mt-6 text-sm text-white/80 cursor-pointer " onClick={()=>setFlipped((prev)=>!prev)}>
  press on card to show details
</div>
      </div>
      
      
      
          </div>)):(<p className="mt-12 font-bold text-white text-md text-center">No Cards </p>)}
 
    </div>
   
   
    {
  modal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">

      <div className="bg-[#162569] border border-white/20 rounded-3xl p-8 w-[90%] max-w-md">

        <h2 className="text-2xl font-bold mb-6">
          Select Account
        </h2>

        <select
          value={accountID}
          onChange={(e) => setAccountID(e.target.value)}
          className="w-full rounded-xl bg-white/10 border border-white/20 p-3 outline-none"
        >
          <option hidden>Account Numbers</option>
         {accounts.map((item)=>(
           <option value={item._id}>
            {`Account Number ${item.accountNumber}`}
          </option>
         ))}

        </select>

        <div className="flex gap-3 mt-6">

          <button onClick={create}
            className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-xl"
          >
            Create
          </button>

          <button
            onClick={() => setModal(false)}
            className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  )
}
    </div> 
  </div> 
  )

}

export default MyCard
