import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SensorProvider } from './context/SensorContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SensorProvider>
        <App />
      </SensorProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
