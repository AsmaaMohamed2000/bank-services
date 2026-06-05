import { motion } from "framer-motion"
import { useState } from "react";
import {  CreditCard,RefreshCw,Plus} from 'lucide-react'
function MyCard() {
    const user = { name: "asmaa", email: "hhggggg" };
    const [Card, setCard] = useState({
      cardNumber: "77766655544",
      expiryDate: "12/12",
      CVV: "123",
      balance: 233333,
    });
    const [flipped, setFlipped] = useState(false);
    const [msg, setMsg] = useState('');
   
  const formatCardNumber=(num)=>{
    if(!num) return '------------------'
    const formatted=String(num).replace(/\D/g,'')
    return formatted.replace(/(\d{4})(?=\d)/g,'$1 ')
  }
  const getCard=()=>{}
  const createCard=()=>{}
    const totalBalace = Card.balance;
  return (
    <div className="pt-24 min-h-screen w-full bg-linear-to-br from-[#0a0f1f]  via-[#101a3a] to-[#1a237e] relative overflow-hidden flex  flex-col items-center justify-between  text-white relative overflow-hidden">
      <div className="md:w-full max-w-xl w-[300px] sm:w-[500px]">
<div className="flex justify-between items-center mt-12 mb-6">
<h2 className="text-white text-md sm:text-2xl font-extrabold flex items-center gap-3">
  <CreditCard/> default card
</h2>
<div className="flex flex-col sm:flex-row gap-4">
<button onClick={getCard} className="flex items-center sm:gap-2 gap-1 bg-white/10 hover:bg-white/20 text-white px-1 py-2 sm:px-3 sm:py-2 rounded-md " title="update"><RefreshCw size={16}/> update</button>
<button onClick={createCard} className="flex items-center sm:gap-2 gap-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-1 py-2 sm:px-3 sm:py-2 rounded-md  " title="create card"><Plus size={16}/> create </button>
</div>
      </div>
      <div className="relative perspective-distant ">
<motion.div onClick={()=>setFlipped((prev)=>!prev)} animate={{rotateY:flipped?180:0}}
  transition={{duration:1}} style={{transformStyle:'preserve-3d'}} className="cursor-pointer select-none"
  >
<div className="relative flex flex-col rounded-2xl p-3 sm:p-6 pb-12 text-white h-64 bg-linear-to-r from-indigo-600  via-purple-600 to-pink-500 " style={{backfaceVisibility:'hidden',transform:'rotateY(0deg)'}}>
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
<div className="font-semibold">{Card?.expiryDate ??'--/--'}</div>
</div>

</div>
<div className="text-2xl tracking-widest mt-4 font-mono">
{formatCardNumber(Card?.cardNumber)}
</div>
<div className="mt-6 flex justify-between  flex-1">
<div className="text-sm self-end">
<div className="text-white/80">user</div>
<div className="font-semibold">{user?.name ?? user?.email ??'--/--'}</div>
</div>
<div className="text-right text-sm self-end">
<div className="text-white/80">card balance</div>
<div className="font-semibold">{Card?.balance?.toFixed(2) ??'0.00'}</div>
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
                    {Card?.CVV ?? "*"}
                  </div>
</div>
 <div className="text-xs text-right">
                  <div className="text-gray-600">expired</div>
                  <div className="font-semibold">
                    {Card?.expiryDate ?? "--/--"}
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
    </div>
     </div>
  )
}

export default MyCard
