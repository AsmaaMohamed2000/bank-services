import { BrowserRouter ,useNavigate} from "react-router-dom"
import Routes from "./Routes/Routes"
import './index.css'
import { ToastContainer } from "react-toastify"
import { useSelector ,useDispatch } from "react-redux"
import { getMe } from "./services/userService"
import { useEffect  } from "react"
import { setUser } from "./redux/auth/authSlice"
function App() {
  const dispatch=useDispatch()
  const navigate=useNavigate()


   useEffect(() => {
    
  const me = async () => {
    try {
      const result = await getMe();

      if (result.success) {
        dispatch(setUser(result.user));
      }
    } catch (error) {
      alert(error.respone.data.message)
      navigate('/login');
    }
  };

  me();
}, []);
 
  return (
    
<>
<Routes/>
      <ToastContainer/></>
   
  )
}

export default App
