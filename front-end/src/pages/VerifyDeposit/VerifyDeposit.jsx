import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import { ckeckDeposit } from '../../services/deposit'
import { useSelector } from 'react-redux'

function VerifyDeposit() {
const user=useSelector(state=>state.auth.user)

  const [status, setStatus] = useState('processing')

  const [params] = useSearchParams()
     const session_id = params.get('session_id')
     const canceled = params.get('canceled')

  const navigate = useNavigate()

  useEffect(() => {
  if (canceled === "true") {
    setStatus("error");
    return;
  }

  if (!session_id) {
    setStatus("error");
    return;
  }

  const interval = setInterval(async () => {
    try {
      const res = await ckeckDeposit(session_id);
console.log(res)
      if (res.status === "success") {
        clearInterval(interval);

        setStatus("success");

        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } catch {
      clearInterval(interval);
      setStatus("error");
    }
  }, 2000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className='min-h-screen text-white px-6 flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900'>

      <div className='text-center flex flex-col items-center'>

        {status === 'processing' && (
          <div className='flex flex-col items-center'>

            <Loader2 className='w-20 h-20 animate-spin text-cyan-400 mb-6' />

            <h2 className='text-2xl font-semibold'>
              Verifying Deposit...
            </h2>

            <p className='text-gray-300 mt-2'>
              Please wait while we confirm your payment
            </p>

          </div>
        )}

       
         {status==='success'&&(
           <div className='flex flex-col items-center'>

            <CheckCircle className='w-24 h-24 text-green-400 mb-6' />

            <h2 className='text-3xl font-bold text-green-400'>
              Deposit Successful
            </h2>

            <p className='text-gray-300 mt-2'>
              Your account balance has been updated
            </p>

            <p className='text-sm text-gray-400 mt-4'>
              Redirecting to dashboard...
            </p>

          </div>
         )}
        

        {status === 'error' && (
          <div className='flex flex-col items-center'>

            <XCircle className='w-24 h-24 text-red-400 mb-6' />

            <h2 className='text-3xl font-bold text-red-400'>
              Deposit Failed
            </h2>

            <p className='text-gray-300 mt-2'>
              Unable to verify this payment
            </p>

          </div>
        )}

      </div>

    </div>
  )
}

export default VerifyDeposit