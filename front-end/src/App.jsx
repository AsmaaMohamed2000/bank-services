import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes/Routes"
import './index.css'
import { ToastContainer } from "react-toastify"
import { useSelector } from "react-redux"
function App() {
   const user=useSelector(state=>state.auth.user)
   console.log(user)
  return (
    <BrowserRouter>
<Routes/>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
