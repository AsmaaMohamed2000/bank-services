import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
function VerifyDeposit() {
  const [status,setStatus]=useState('loading')
    const [params]=useSearchParams()
      const navigate=useNavigate()
  return (
    <div className='min-h-screen text-white px-6 flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900'>
      <div className='text-center flex flex-col items-center'>
{status==='loading'&&(
  <div className='flex flex-col items-center animate-pulse '>
<Loader2 className='w-20 h-20 animate-spin text-cyan-400 mb-6 '/>
<h2 className='text-2xl font-semibold'>veryfying deposit wait...</h2>
  <p className='text-gray-300 mt-2'>wait little</p>
  </div>
)}
{status==='success'&&(
    <div className='flex flex-col items-center animate-pulse '>
<CheckCircle className='w-24 h-24 animate-spin text-green-400 mb-6 '/>
<h2 className='text-2xl font-semibold'>deposit done</h2>
  <p className='text-gray-300 mt-2'>to dashbord </p>
  </div>
)}
{status==='error'&&(
    <div className='flex flex-col items-center animate-pulse '>
<XCircle className='w-24 h-24 animate-spin text-red-400 mb-6 '/>
<h2 className='text-2xl font-semibold'>deposit fail</h2>
  <p className='text-gray-300 mt-2'>error </p>
  </div>
)}
      </div>
    </div>
  )
}

export default VerifyDeposit
