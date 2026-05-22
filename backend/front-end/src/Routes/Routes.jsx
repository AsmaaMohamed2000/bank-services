import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Transfer from "../pages/Transfer/Transfer";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Register from "../pages/Register/Register";
import Deposit from "../pages/Deposit/Deposit";
import Dashbord from "../pages/Dashbord/Dashbord";
import Profile from "../pages/Profile/Profile";
import VerifyDeposit from "../pages/VerifyDeposit/VerifyDeposit";
import Notification from "../pages/Notification/Notification";
import MyCard from "../pages/MyCard/MyCard";
import Transaction from "../pages/Transaction/Transaction";
import NotFound from "../pages/NotFound/NotFound";

function Routess() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashbord />} />
        <Route
          path="transactions"
          element={
           
              <Transaction />
           
          }
        />
        <Route path="transfer" element={<Transfer />} />
        <Route
          path="profile"
          element={
          
              <Profile />
          
          }
        />
        <Route
          path="mycard"
          element={
            
              <MyCard />
            
          }
        />
        <Route
          path="deposits"
          element={
            <ProtectedRoute>
              <Deposit />
            </ProtectedRoute>
          }
        />
        <Route
          path="verifydeposit"
          element={
            <ProtectedRoute>
              <VerifyDeposit />
            </ProtectedRoute>
          }
        />
        <Route
          path="notificationst"
          element={
           
              <Notification />
           
          }
        />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Routess;
