import { useState } from "react"


function Deposit() {
  const [amount,setAmount]=useState('')
  const handleDeposit=()=>{}
  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-sm  mx-auto  mt-10 text-center">
      <h2 className="mb-4 font-bold text-xl">
deposit balance
      </h2>
      <input type="number" placeholder="enter amount on dolar" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border rounded-md  p-2 w-full text-center mb-4 "/>
<button onClick={handleDeposit} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full ">continue deposit throught stripe</button>
    </div>
  )
}

export default Deposit
