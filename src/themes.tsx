import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/themes.css'
import './styles/pivot.css'
import { ThemesPage } from './demo/ThemesPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemesPage />
  </StrictMode>,
)
