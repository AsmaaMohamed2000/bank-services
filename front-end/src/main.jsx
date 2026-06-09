import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import 'react-toastify/dist/ReactToastify.css'
createRoot(document.getElementById('root')).render(
 <Provider store={store}>
 <StrictMode>
  <BrowserRouter>
     <App />
  </BrowserRouter>
 
  </StrictMode>
 </Provider>

)
