import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './assets/index.css'
import { WalletProvider } from './context/WalletContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>,
)