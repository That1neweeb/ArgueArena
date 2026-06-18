import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './src/App.jsx'
import { AuthProvider } from './src/context/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>          
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
