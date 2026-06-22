import { motion, moveItem } from "framer-motion";
import { useForm } from "react-hook-form";
import { getCards } from "../../services/cardService";
import {
  Wallet,
  Mail,
  CreditCard,
  User,
  Plus,
  Building2
} from "lucide-react";
import { editUserInfo } from "../../services/authService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createAcount, getAcount } from "../../services/acountService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Profile() {
   const [cards, setCard] = useState([]);
    const navigate=useNavigate()
    const user=useSelector(state=>state.auth.user)
    console.log(user)
const [verifyModal,setVerifyModal]=useState(false)
  const [flipped, setFlipped] = useState(false);
   const [balance, setBalance] = useState(0);
 const [serverError ,setServerError]=useState('')
   const {register,handleSubmit,setError,formState:{errors,isSubmitting}}=useForm()
 
  const [editName, setEditName] = useState(user?.fullName ||'');

  const [editEmail, setEditEmail] = useState(user?.email||'');
  const [editPhone,setEditPhone]=useState(user?.phone ||'')

  const [openModal, setOpenModal] = useState(false);

  const [accountType, setAccountType] = useState("savings");

  const [accounts, setAccounts] = useState([]);

  const [card] = useState({
    cardNumber: "7777666655554444",
    expiryDate: "12/28",
    cvv: "*"
  });

 
useEffect(()=>{
 if (!user){
      return
    }
    const getAccounts=async()=>{
        try{
          const res=await getAcount(user)
          setAccounts(res.accounts)
          const totalBalance=res.accounts.reduce((sum,curr)=>sum+Number(curr.balance)

          ,0)
          setBalance(totalBalance)
          console.log(accounts)


      }catch(err){
        toast.error(err.response.data.message)
      }
    }
    getAccounts()
    const getAllCards=async()=>{
      if(!user) return
       try{
    const result=await getCards(user)
    setCard(result.cards)
      }catch(err){
    toast.error(err.response.data.message)
      }
    }
    getAllCards()
   
},[user])


  const onSubmi = async(data)=>{
    if(!user) return 

  console.log(data)
    try{
 
       const result =await editUserInfo(
        {user,data})
       if(result.success){
        // if(result. emailVerificationRequire){
        //   navigate('/verify-otp',{state:{email:data.email}})
        // }
          setEditName(result.userExist.fullName)
        setEditEmail(result.userExist.email)
          setEditPhone(result.userExist.phone)
 toast.success('Account updated Successfully')


       }
 
    }catch(err){
       console.log("RESPONSE:", err?.response?.data);
     if(err.response.data.type==='validation'){
         err.response.data.errors.forEach((item)=>(
           setError(item.field,{
             message:item.message
           })
         ))
         return
     }
 
     setServerError(err.response.data.message)
  
    }
 }


  const createAccount=async()=>{
    if (!user){
      return
    }
    try{
      const res=await createAcount({user,accountType})
      toast.success('account created successfuly')
      try{
          const res=await getAcount(user)
          setAccounts(res.accounts)
          const totalBalance=res.accounts.reduce((sum,curr)=>sum+curr.balance

          ,0)
          setBalance(totalBalance)
          setOpenModal(false)


      }catch(err){
        toast.error(err.response.data.message)
      }
    }catch(err){
      toast.error(err.response.data.message)
    }
  }
  return (
   
    <div className="pt-24 min-h-screen w-full bg-linear-to-br from-[#0a0f1f] via-[#101a3a] to-[#1a237e] flex flex-col items-center text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -z-10 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl -top-[200px] -left-[200px]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -z-10 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-3xl -top-[200px] -right-[200px]"
      /><motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold">
          My Profile
        </h1>

        <p className="text-gray-400 mt-3">
          Welcome {user?.fullName}
        </p>
      </motion.div>
      <div className="w-[90%] max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">
            Total Balance
          </p>

          <h3 className="text-2xl font-bold text-yellow-300">
            ${balance?.toFixed(2)}
          </h3>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">
            Accounts
          </p>

          <h3 className="text-2xl font-bold">
            {accounts.length}
          </h3>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">
            Cards
          </p>

          <h3 className="text-2xl font-bold">
            {cards.length}
          </h3>
        </div>

        {/* <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">
            Status
          </p>

          <h3 className="text-green-400 font-bold">
            Active
          </h3>
        </div> */}

      </div>
      <div className="w-[90%] max-w-6xl mb-10">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            My Accounts
          </h2>

          <button 
            onClick={() => setOpenModal(true)}
            className=" bg-purple-700 hover:bg-purple-500 cursor-pointer  px-4 py-2 cursor-pointer rounded-xl  flex items-center  gap-2"
          >
            <Plus size={18} />
            New Account
          </button>

        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">

          {accounts.map((account) => (

            <div
              key={account._id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5"
            >

              <div className="flex items-center gap-3 mb-4">
                <Building2 />
                <h3 className="font-bold text-lg">
                  {account.accountType} Account
                </h3>
              </div>

              <p className="text-gray-400">
               <span className="me-3 font-bold text-white">Account Number </span>   {account.accountNumber}
              </p>

              <p className="mt-3 text-yellow-300 font-bold">
               <span className="me-3 font-bold text-white">Balance</span>  ${account.balance}
              </p>

            </div>

          ))}

        </div>

      </div>
      <div className="mb-10 ">

  <h2 className="text-2xl font-bold text-center mb-5">
    My Cards
  </h2>

 <div className="grid md:grid-cols-2 gap-3">
  {cards&&cards.length>=1?cards.map((item)=>(
   <motion.div
    className=" perspective-distant"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }} transition={{duration:1}}
  >
<div className="flex gap-3 items-center mb-4">
  <span className={`w-4 h-4 rounded-full ${item.status==='active'?'bg-green-600':item.status==='blocked'?'bg-red-600':'bg-yellow-500'}`}></span>
  <span>{item.status}</span>
</div>
    <motion.div
      onClick={() => setFlipped((prev)=>!prev)}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.8 }}
      style={{ transformStyle: "preserve-3d" }}
      className="cursor-pointer relative  w-[310px] md:w-[420px] h-[220px] md:h-[250px]"
    >

      {/* Front */}

      <div
        className="absolute top-0 left-0 w-full h-full rounded-2xl p-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
        style={{
          backfaceVisibility: "hidden"
        }}
      >

        <div className="flex justify-between mb-6">

          <div>
            <h3 className="font-bold">
              Neo Bank
            </h3>
          </div>

          <CreditCard />
        </div>

        <p className="text-xl md:text-2xl tracking-widest font-mono mb-8">
          7777 6666 5555 4444
        </p>

        <div className="flex justify-between">

          <div>
            <p className="text-white/70 text-xs">
              CARD HOLDER
            </p>

            <p>
              {user?.fullName}
            </p>
          </div>

          <div>
            <p className="text-white/70 text-xs">
              EXPIRES
            </p>

            <p>
              {item.expiryDate}
            </p>
          </div>

        </div>

      </div>

      {/* Back */}

      <div style={{backfaceVisibility:'hidden',transform:'rotateY(180deg)'}} className="absolute top-0 left-0 w-full rounded-2xl p-6  text-black h-64  bg-linear-to-r from-gray-200 to-gray-300">
<div className="h-10 bg-black/85 rounded-sm"/>
<div className="mt-4 flex justify-between items-center ">
<div className="w-2/3  ">
 <div className="text-xs text-gray-700 mb-1">CVV</div>
                  <div className="bg-white p-2 rounded-md w-max tracking-widest font-mono">
                    {item?.CVV ?? "*"}
                  </div>
</div>
 <div className="text-xs text-right">
                  <div className="text-gray-600">expired</div>
                  <div className="font-semibold">
                    {item?.expiryDate ?? "--/--"}
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

  </motion.div>
 )):<p className="text-center col-span-2 text-md text-white font-bold mt-12">No Cards </p>}

 </div>
</div>
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl w-[90%] max-w-4xl mb-16"
>

  <h2 className="text-2xl font-bold mb-6">
    Edit Profile
  </h2>

  <form
    onSubmit={handleSubmit(onSubmi)}
    className="flex flex-col gap-4"
  >

    <input
      type="text"
      value={editName}
      {...register('fullName')}
      onChange={(e) => setEditName(e.target.value)}
      placeholder="Full Name"
      className="rounded-xl bg-white/5 border border-white/20 p-3 outline-none"
    />
{errors.fullName&&<p className="text-red-400 text-sm my-2">{errors.fullName.message}</p>}
    <input
      type="email"
      value={editEmail}
      {...register('email')}
      onChange={(e) => setEditEmail(e.target.value)}
      placeholder="Email"
      className="rounded-xl bg-white/5 border border-white/20 p-3 outline-none"
    />
    {errors.email&&<p className="text-red-400 text-sm my-2">{errors.email.message}</p>}

      <input
      type="text"
      value={editPhone}
      {...register('phone')}
      onChange={(e) => setEditPhone(e.target.value)}
      placeholder="phone number"
      className="rounded-xl bg-white/5 border border-white/20 p-3 outline-none"
    />
{errors.phone&&<p className="text-red-400 text-sm my-2">{errors.phone.message}</p>}

    <button
      type="submit"
      className="bg-purple-600 hover:bg-purple-700  cursor-pointer py-3 rounded-xl font-bold"
    >
      Save Changes
    </button>

  </form>

</motion.div>
{
  openModal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">

      <div className="bg-[#162569] border border-white/20 rounded-3xl p-8 w-[90%] max-w-md">

        <h2 className="text-2xl font-bold mb-6">
          Open New Account
        </h2>

        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="w-full rounded-xl bg-white/10 border border-white/20 p-3 outline-none"
        >
          <option value="Savings">
            savings Account
          </option>

          <option value="checking">
            checking Account
          </option>

          <option value="business">
            business Account
          </option>
        </select>

        <div className="flex gap-3 mt-6">

          <button onClick={createAccount}
            className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-xl"
          >
            Create
          </button>

          <button
            onClick={() => setOpenModal(false)}
            className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  )
}

</div>
  );
}


  
export default Profile;




  