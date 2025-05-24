import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <StoreContextProvider>

        <App />

      </StoreContextProvider>
    </AuthProvider>
  </BrowserRouter>
  )
