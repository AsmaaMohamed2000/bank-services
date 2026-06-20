import { motion, AnimatePresence, color } from "framer-motion";
import { NavLink ,useLocation } from "react-router-dom";
import { MdAccountBalance } from "react-icons/md";
import { HiBars3, HiXMark } from "react-icons/hi2"
import { Bell } from 'lucide-react';
import { useState } from "react";
function Navbar() {
  const user=true
  const [isMobileMenueOpen,setIsMobileMenueOpened]=useState(false)
  const navLinks=[
    {path:'/' ,label:'Home'},
      {path:'transactions' ,label:'transactions'},
        {path:'transfer', label:'transfer'},
        
          {path:'profile', label:'profilee'},
            {path:'mycard', label:'mycard'},

  ]
  const activelink=({isActive})=>(
    {
      color:isActive?'yellow':'white',
      opacity:isActive?'0.7':'0.6'
    }
  )
  return (
    <motion.div
      className="fixed top-0 left-0 right-0  z-50 w-full backdrop-blur-xl 
    bg-linear-to-br from-[#0a0f1f] via-[#1a237e] to-[#3f51b5] border-b border-white/20 shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white px-4 sm:px-6 md:px-3 lg:px-6 py-4">
        {/* logo*/ }
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-br from-yellow-400 to-orange-500 p-2 rounded-2xl shadow-md ">
            <span className="text-2xl">
              <MdAccountBalance />
            </span>
          </div>
          <h1 className="text-2xl font-extrabold  tracking-wide ">
            <span className="text-yellow-400">  Neo</span> Bank
          </h1>
        </div>
        {/* links*/}
        <div className="hidden md:flex items-center gap-6">
          {user?(
            <>
{navLinks.map((link)=>(
  <NavLink style={activelink} key={link.path} to={link.path}
  className={`relative text-sm font-medium transition-all duration-300 hover:text-yellow-300`}>
{link.label}
  </NavLink>

))}
{/* notifications*/ }
<NavLink to={'notificationst'} className={'relative  '}>
  <motion.div whileHover={{scale:1.15, rotate:10}} whileTap={{scale:.95}}
  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all  relative">
<Bell size={22} className='text-yellow-300'/>
<span className="absolute flex  items-center justify-center -top-2 -right-2 h-6 min-w-6  p-1  bg-red-500 rounded-[999px] ">0</span>
  </motion.div>

</NavLink>
<button  className="ml-2 lg:ml-4 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all  bg-linear-to-r from-red-500 to-pink-600 px-4 py-1.5">Logout</button>
            </>
          ):(
            <>
            <NavLink to={'login'} className={'bg-linear-to-r from-[#2858dc] to-purple-800 px-4 py-1.5 rounded-full font-medium  flex justify-center items-center hover:shadow-lg hover:shadow-indigo-500/30 transition-all'}>
Login
            </NavLink>
            <NavLink to='register' className={'bg-linear-to-r from-[#2858dc] to-purple-800 px-4 py-1.5 rounded-full font-medium flex justify-center items-center hover:shadow-lg hover:shadow-indigo-500/30 transition-all '}>
Register
            </NavLink>   
            </>
          )}

        </div>
        {/* mobile */}
        <div className="flex items-center gap-3 sm:gap-4 md:hidden">
          {user&&(
            <>
            <NavLink to={'notificationst'} className={'relative'}>
              <motion.div whileTap={{scale:.9}} className="p-2 relative rounded-full bg-white/10 hover:ng-white/20 transition-all ">
<Bell size={22} className="text-yellow-300 "/>
<span className="absolute -top-2 -right-2 flex justify-center items-center h-6 min-w-6  p-1  bg-red-500 rounded-[999px]">000</span>
              </motion.div>

            </NavLink>
         
          </>
          )}
         
    <button onClick={()=>setIsMobileMenueOpened((prev)=>!prev)} className="text-white  text-3xl focus:outline-0 ">
            {isMobileMenueOpen?<HiXMark/>:<HiBars3/>}
          </button>
        </div>
        {/*menue mobile */}
        <AnimatePresence>
          {isMobileMenueOpen&&(
            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}
            exit={{height:0,opacity:0}} transition={{duration:0.3}}  className="md:hidden bg-white/10 backdrop-blur-2xl border-b border-white/20 fixed left-1/2 -translate-x-1/2  top-full overflow-hidden">
<div className="flex flex-col px-6 py-4 gap-4 text-white">
  {user?(
<>
{navLinks.map((link)=>(
  <NavLink style={activelink} key={link.path} to={link.path} onClick={()=>setIsMobileMenueOpened(false)}
  className={`relative text-sm font-medium transition-all duration-300 hover:text-yellow-300`}>
{link.label}
  </NavLink>

))}
<button  className="mt-2 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all  bg-linear-to-r from-red-500 to-pink-600 px-4 py-1.5">Logout</button>

</>
  ):(
            <>
            <NavLink to={'login'} className={'bg-linear-to-r from-red-500  to-purple-800 px-4 py-1.5 rounded-full font-medium  flex justify-center items-center hover:shadow-lg hover:shadow-indigo-500/30 transition-all'}>
Login
            </NavLink>
            <NavLink to='register' className={'bg-linear-to-r to-red-500  from-purple-800  px-4 py-1.5 rounded-full font-medium flex justify-center items-center hover:shadow-lg hover:shadow-indigo-500/30 transition-all '}>
Register
            </NavLink>
            </>
          )}

</div>
            </motion.div>

          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Navbar;
