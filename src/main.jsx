import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initThemeFromStorage } from './store/useThemeStore'
import App from './App.jsx'

initThemeFromStorage()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
