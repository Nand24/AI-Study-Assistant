import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import DashboardContext from './context/DashboardContext.jsx'
import StudyContext from './context/StudyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <DashboardContext>
        <StudyContext>
          <BrowserRouter>
            <App />
            <ToastContainer/>
          </BrowserRouter>
        </StudyContext>
      </DashboardContext>
    </UserContext>
  </StrictMode>,
)
