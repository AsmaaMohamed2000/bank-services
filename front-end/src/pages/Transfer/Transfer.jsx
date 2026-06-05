import  { useState } from 'react'
import { animate, motion } from 'framer-motion'
import { Send,Mail ,DollarSign, Copy } from 'lucide-react'
function Transfer() {
  const [email,setEmail]=useState('')
    const [amount,setAmount]=useState('')
      const [msg,setMsg]=useState('')
        const [loading,setLoading]=useState(false)
        const handleTransfer=()=>{

        }
  return (
    <div className='min-h-screen flex items-center  justify-center bg-linear-to-br from-[#1a002e] via-[#3a0078] to-[#b48cf2]  py-24 px-6'> 
      <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}}
      className='w-full max-w-lg bg-white/10 backdrop-blur-2xl border  border-white/20 rounded-3xl py-7 px-4 shadow-2xl text-white'
      ><motion.div initial={{scale:0.8, opacity:0}} animate={{opacity:1,scale:1}} transition={{duration:1}}
      className='text-center mb-8 '
      >
<div className='w-20 h-20  mx-auto bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg '>
<Send size={36}/>
</div>
<h2 className='text-3xl  font-extrabold  mt-4 '>Transfer money </h2>
<p className='text-gray-300 text-sm mt-2 '>send money safely and quickly  to any other account </p>
      </motion.div>
      {/* form */}
      <div className='space-y-6'>
        <motion.div whileFocus={{scale:1.2}} className='flex items-center  gap-3  bg-white/10  p-4 rounded-xl  border border-white/10  transition in-focus-within:border-green-400 '>
<Mail  className='text-green-300 '/>
<input type="email" placeholder='Enter email of reciever ' value={email}
onChange={(e)=>setEmail(e.target.value)} className='bg-transparent outline-none  text-white placeholder-gray-400'
/>
        </motion.div>
               <motion.div whileFocus={{scale:1.2}} className='flex items-center  gap-3  bg-white/10  p-4 rounded-xl  border border-white/10  transition in-focus-within:border-green-400 '>
<Mail  className='text-green-300 '/>
<input type="number" placeholder='amount transfered ' value={amount}
onChange={(e)=>setAmount(e.target.value)} className='bg-transparent outline-none  text-white placeholder-gray-400'
/>
        </motion.div>
        <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.2}} disabled={loading} onClick={handleTransfer}
        className={`py-3 w-full rounded-xl font-bold text-lg  transition-all ${loading?'bg-gray-500 ':'bg-linear-to-r from-green-400 to-emerald-500'}`}
        >
{loading?' Sending... ':' Send Now'}
        </motion.button>
       

      </div>
{msg&&(
  <motion.p initial={{opacity:0}} animate={{opacity:1}} className={`mt-6 text-center font-medium ${msg.includes('')?'text-red-400':'text-green-400'}`}>
{msg}
  </motion.p>
)}
{/*footer */}
<div className='text-center text-gray-300 text-sm mt-8 '>
<p>&copy; 2026 NeoBank  - transfer safe and fast </p>
</div>
      </motion.div>
    </div>
  )
}

export default Transfer
