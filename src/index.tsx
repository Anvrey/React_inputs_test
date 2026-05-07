import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './index.scss'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)
