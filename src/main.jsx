import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {CarProvider} from "./componentes/CarContext"



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CarProvider>
      <App />
      </CarProvider>
    </BrowserRouter>
  </React.StrictMode>,
)