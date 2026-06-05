
import { motion } from "framer-motion"
import { ShieldCheck, Mail, Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "react-toastify"
import { verifyOtp } from "../../services/authService"
import { useLocation, useNavigate } from "react-router-dom"

function Verifyotp() {
const navigate=useNavigate()
  const [serverError, setServerError] = useState('')
  const location=useLocation()
//   const email=location.state.email||''

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {

    try {

      const result = await verifyOtp(data)

      if (result.success) {
        toast.success('Email verified successfully')
        navigate('/login',{replace:true})
      }

    } catch (err) {

      const response = err.response?.data

      if (response?.type === 'validation') {

        response.errors.forEach((item) => {
          setError(item.field, {
            type: 'server',
            message: item.message
          })
        })

        return
      }

      setServerError(
        response?.message || 'Something went wrong'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0b0020] via-[#3b008f] to-[#b38bff] p-3 sm:p-6 pt-24">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full mt-20 max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 sm:p-8 text-white"
      >

        <div className="text-center mb-10">

          <div className="w-20 h-20 mx-auto bg-linear-to-br from-yellow-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={36} />
          </div>

          <h2 className="text-3xl font-extrabold tracking-wide">
            Verify OTP
          </h2>

          <p className="text-gray-300 mt-2">
            Enter the code sent to your email
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {serverError && (
            <p className="text-red-300">
              {serverError}
            </p>
          )}

          <div>

            <div className="flex items-center gap-2 mb-2">
              <Mail className="text-yellow-300" size={18} />
              <label className="text-sm text-gray-200">
                Email
              </label>
            </div>

            <input 
              {...register('email', {
                required: 'Email is required'
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 outline-0 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

          </div>

          <div>

            <div className="flex items-center gap-2 mb-2">
              <Lock className="text-yellow-300" size={18} />
              <label className="text-sm text-gray-200">
                OTP Code
              </label>
            </div>

            <input
              {...register('code', {
                required: 'OTP code is required'
              })}
              type="text"
              placeholder="Enter 6-digit code"
              className="w-full p-3 outline-0 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
            />

            {errors.code && (
              <p className="text-red-400 text-sm mt-1">
                {errors.code.message}
              </p>
            )}

          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-yellow-400 text-white py-3 rounded-xl font-bold transition"
          >
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </motion.button>

        </form>

        <motion.div
          className="h-0.5 bg-linear-to-r from-yellow-400 via-pink-500 to-purple-600 mt-10 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        <div className="text-center mt-6 text-gray-300 text-sm">
          <p>&copy; NeoBank 2026 نظام مصرفي ذكي وآمن</p>
        </div>

      </motion.div>

    </div>
  )
}

export default Verifyotp