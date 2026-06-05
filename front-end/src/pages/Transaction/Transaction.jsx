import { motion } from "framer-motion"
import { ArrowDownCircle,ArrowUpCircle,Clock } from "lucide-react"
import { useState } from "react"

function Transaction() {
  const [transaction,setTransaction]=useState([])

  return (
    <div className="min-h-screen  py-24 px-6 flex items-center justify-center bg-linear-to-br from-[#1a002e] via-[#3a0078] to-[#b48cf2] ">
      <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}}
      className="w-full max-w-3xl mt-20 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl  p-8 shadow-2xl text-white"
      >
<motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}} className="text-center mb-10">
<div className="w-20 h-20 mx-auto bg-linear-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg ">
<Clock size={36}/>
</div>
<h2 className="text-3xl  font-extrabold mt-4 ">transaction date </h2>
<p className="text-gray-300 text-sm mt-2 ">all last transaction  bank </p>
</motion.div>
{/*transaction table */}
<div className=" overflow-x-auto  rounded-2xl border border-white/10 bg-white/5 shadow-inner">
<table className="min-w-full  text-center text-gray-200">
<thead>
  <tr className="bg-white/10 text-white text-lg font-semibold ">
    <th className="py-4">type </th>
     <th className="py-4">amount</th>
      <th className="py-4">date</th>
  </tr>
</thead>
<tbody>
  {
    transaction.length>0?(
      transaction.map((item,index)=>(
<motion.tr  key={item._id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:index*0.05}}
className="border-t border-white/10 hover:bg-white/10 transition"
>
<td className="py-4 flex items-center justify-center gap-2">
{item.type==='deposit'?(
  <ArrowDownCircle className="text-green-400"/>
):(<ArrowUpCircle  className="text-red-400"/>)}
<span>{item.type==='deposit'?'deposit':'withdraw/transfer'}</span>
</td>
<td className={`py-4 font-semibold ${itemm.type==='deposit'?'text-green-400':'text-red-400'}`}>

  $ {item.amount}
</td>
<td className="py-4 text-gray-300 ">
{new Date(item.date).toLocaleDateString('en-EG')}
</td>
</motion.tr>
      ))
    )
 :(
  <tr>
    <td colSpan='3' className="py-8 text-gray-400 text-lg ">no transaction now</td>
  </tr>
 )}
</tbody>
</table>
</div>
<div className="text-center mt-8 text-gray-300">
 &copy; 2026 NeoBank your transaction in safe 
</div>
      </motion.div>
    </div>
  )
}

export default Transaction
