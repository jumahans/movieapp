import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'            // ✅ Tailwind CSS
import 'boxicons/css/boxicons.min.css' // ✅ Optional icons

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
