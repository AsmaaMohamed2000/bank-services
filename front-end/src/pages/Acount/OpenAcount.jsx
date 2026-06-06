import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useSelector } from "react-redux";
import { createAcount } from "../../services/acountService";
import { replace ,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function OpenAccount() {
   const user=useSelector(state=>state.auth.user)
  const navigate=useNavigate()
 
  const handleOpenAccount = async() => {
try{
const result=await createAcount(user)
if(result.success){
  toast.success(result.message)
  navigate('/',{replace:true})
}
}catch(err){
alert(err.response.data.message)
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#1a002e] via-[#3a0078] to-[#b48cf2] px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white"
      >

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >

          <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl mb-6">
            <Building2 size={42} />
          </div>

          <h1 className="text-3xl font-extrabold mb-3">
            Welcome {user?.fullName ||'User'}
          </h1>

          <p className="text-gray-300 mb-8">
            Create your NeoBank account and start sending,
            receiving and managing your money securely.
          </p>

          <button
            onClick={handleOpenAccount}
            className="w-full py-4 cursor-pointer rounded-xl font-bold text-lg bg-linear-to-r from-green-400 to-emerald-500 hover:scale-105 transition-all"
          >
            Open Account
          </button>

        </motion.div>

        <div className="mt-8 text-center text-sm text-gray-300">
          Your account number and IBAN will be generated automatically.
        </div>

      </motion.div>

    </div>
  );
}

export default OpenAccount