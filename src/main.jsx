import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as atatus from 'atatus-spa';
import './index.css'
import App from './App.jsx'

atatus.config('fcb7300e7ebe4b8089720b524822f3aa').install();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);