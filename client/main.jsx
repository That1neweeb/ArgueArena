import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './src/features/Daily_Mode/client/App.jsx'
import { AuthProvider } from './src/context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>,
)
