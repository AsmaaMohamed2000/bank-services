import { Routes,Route } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import Transfer from "../pages/Transfer/Transfer"
import Login from "../pages/Login/Login"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import Register from "../pages/Register/Register"
import Deposit from "../pages/Deposit/Deposit"
import Dashbord from "../pages/Dashbord/Dashbord"
import Profile from "../pages/Profile/Profile"
import VerifyDeposit from "../pages/VerifyDeposit/VerifyDeposit"
import Notification from "../pages/Notification/Notification"
import MyCard from "../pages/MyCard/MyCard"
import Transaction from "../pages/Transaction/Transaction"
import NotFound from "../pages/NotFound/NotFound"

function Routess() {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Dashbord/>}/>
      <Route path="transactions" element={<ProtectedRoute><Transaction/></ProtectedRoute>}/>
        <Route path="transfer" element={<ProtectedRoute><Transfer/></ProtectedRoute>}/>
          <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path="mycard" element={<ProtectedRoute><MyCard/></ProtectedRoute>}/>
              <Route path="deposits" element={<ProtectedRoute><Deposit/></ProtectedRoute>}/>
                <Route path="verifydeposit" element={<ProtectedRoute><VerifyDeposit/></ProtectedRoute>}/>
                   <Route path="notificationst" element={<ProtectedRoute><Notification/></ProtectedRoute>}/>
   
    <Route path="login" element={<Login/>}/>
     <Route path="login" element={<Register/>}/>
      <Route path="*" element={<NotFound/>}/>
        </Route>
      
    </Routes>
  )
}

export default Routess
