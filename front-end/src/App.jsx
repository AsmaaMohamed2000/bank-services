import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes/Routes"
import './index.css'
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <BrowserRouter>
<Routes/>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
