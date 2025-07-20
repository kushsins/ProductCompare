import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './pages/App.tsx'
import { CompareProvider } from './CompareContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CompareProvider>
      <App />
    </CompareProvider>
  </StrictMode>,
)
