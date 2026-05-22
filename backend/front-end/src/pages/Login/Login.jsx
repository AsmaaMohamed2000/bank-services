import { LogIn ,Mail ,Lock} from "lucide-react"
import { motion } from "framer-motion"
import {useForm} from 'react-hook-form'
import Register from "../Register/Register"
function Login() {
  const {
    register,handleSubmit,formState:{loading,errors}
  }=useForm()
  const onSubmi=async(data)=>{

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0b0020] via-[#3b008f] to-[#b38bff] p-3 sm:p-6 pt-24 ">
      <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}}
      className="w-full mt-20 max-w-md bg-white/10 backdrop-blur-2xl  border  border-white/20 rounded-3xl p-4 sm:p-8 text-white"
      >
<motion.div className="text-center mb-10">
<div className="w-20 h-20 mx-auto bg-linear-to-br from-yellow-400 to-purple-600 rounded-full flex items-center justify-center mb-4 ">
<LogIn size={36}/>
</div>
<h2 className="text-3xl  font-extrabold tracking-wide ">log in </h2>
<p className="text-gray-300 mt-2"> welcom to safe neobank </p>
</motion.div>
{/*form */}
<form onSubmit={handleSubmit(onSubmi)} action="" className="space-y-6 ">

  <div>
    <div className="flex items-center gap-2 mb-2">
<Mail className="text-yellow-300" size={18}/>
<label className="text-sm text-gray-200 " htmlFor="">email</label>

    </div>
    <input {...register('email' ,{required:true})} type="email" placeholder="enyer email" className="w-full p-3 outline-0 rounded-xl  bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2  focus:ring-purple-400"/>
  </div>
  <div>
    <div className="flex items-center gap-2 mb-2">
<Lock className="text-yellow-300" size={18}/>
<label className="text-sm text-gray-200 " htmlFor="">password</label>

    </div>
     <input {...register('password' ,{required:true})} type="password" placeholder="enyer password" className="w-full p-3 outline-0 rounded-xl  bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2  focus:ring-purple-400"/>

  </div>
  <motion.button className="w-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500  hover:to-yellow-400 text-white py-3 rounded-xl font-bold  transition " whileHover={{scale:1.05}} type="submit" disabled={loading}>
     {loading?'sending...':'Login'}
  </motion.button>
</form>
<motion.div className='h-0.5 bg-linear-to-r  from-yellow-400 via-pink-500  to-purple-600 mt-10  rounded-full' initial={{width:0}} animate={{width:'100%'}} transition={{duration:1,delay:0.4}}/>
<div className="text-center mt-6 text-gray-300 text-sm ">
  <p>&copy; NeoBank 2026 نظام مصرفي زكي وامن </p>
</div>

      </motion.div>
    </div>
  )
}

export default Login
