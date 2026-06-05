import { AnimatePresence, motion } from "framer-motion"
import { Bell, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
function Notification() {
    const [notification,setNotification]=useState([
      {
        _id:'2',title:'update share',message:'share end in 3 days ',read:false,createdAt:new Date().toISOString()}
      
    ])
    const markAsRead=(id)=>{
      setNotification((prev)=>prev.map((item)=>item._id===id?{...item,read:true}:item))
    }
  return (
    <div className='pt-30 relative min-h-screen flex items-center justify-center overflow-hidden p-6 text-white bg-[#0b0014]'>
      <div className='absolute inset-0  bg-linear-to-br from-[#1a0033] via-[#4a0080] to-[#9d00ff]' />
<div className='absolute w-[600px] h-[600px] bg-purple-600/30 blur[120px]  rounded-full top-1/4 left-1/2 -translate-x-1/2  animate-pulse '/>

<motion.div className="relative rounded-3xl p-8  z-10 w-full max-w-3xl  bg-white/10 backdrop-blur-2xl border border-white/20 " initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} transition={{duration:1}}>
<motion.div className="text-center mb-8 ">
<motion.div className="inline-block " animate={{rotate:[0,15,-15,0]}} transition={{duration:4,repeat:Infinity}}>
<Bell size={58} className="text-yellow-400 drop-shadow-lg "/>
</motion.div>
<h2 className="text-4xl font-extrabold mt-4 tracking-wide">notification</h2>
<p className="mt-2 text-gray-300">all updates</p>
</motion.div>
<div className="relative max-h-[500px] overflow-y-auto pr-2 custom-scroll ">
<AnimatePresence>
  {notification.length===0?(
    <motion.p initial={{opacity:0}} animate={{opacity:1}}
    className="text-center text-gray-400 text-lg "
    >
no notification
    </motion.p>
  ):(
    <ul className="space-y-4 ">
{notification.map((item,i)=>(
  <motion.li key={item._id} initial={{opacity:0,x:-30}} animate={{opacity:1,x:-0}}
  transition={{duration:1 ,delay:i*0.07}} className={`relative overflow-hidden  group p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 flex items-center justify-between hover:scale-[1.02] ${item.read?'bg-white/5 border-white/10 text-gray-400':'bg-linear-to-r from-purple-600/30 to-pink-/20  border-pur/30'}`}
  >
<span className="absolute left-0 top-0 w-[3px] h-full bg-linear-to-b from-yellow-400 via-pink-500 to-purple-600  opacity-0 group-hover:opacity-100  transition-opacity duration-300 "/>
 <div className="flex-1 ">
<h3 className="text-lg font-bold mb-1">{item.title}</h3>
<p className="text-sm text-gray-300">{item.message}</p>
<div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
<Clock size={14} />
{new Date(item.createdAt).toLocaleString('en-SA')}
</div>
 </div>
 {!item.read&&(
  <motion.button whileTap={{scale:.9}} onClick={()=>markAsRead(item._id)} className="bg-green-500/80 hover:bg-amber-600/80  px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 ">
<CheckCircle size={18}/> done 
  </motion.button>
 )}
  </motion.li>
))}
    </ul>
  )}
</AnimatePresence>
</div>
</motion.div>
      
    </div>
  )
}

export default Notification
