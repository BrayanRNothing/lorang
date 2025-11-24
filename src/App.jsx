import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inicio from './componentes/Inicio'
import Catalogo from './componentes/Catalogo'
import Navbar from './componentes/Navbar'
import Contacto from './componentes/Contacto'
import ProductView from './componentes/ProductView'
import Empresa from './componentes/Empresa'
import { CarProvider } from './componentes/CarContext'
import { ToastProvider } from './componentes/Toast'
import AdminProtegido from './componentes/Admin'



export default function App() {
  return(
    <>
    <ToastProvider>
    <CarProvider>
      <header>
        <Navbar />
      </header>
      <main className="bg-white">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/producto/:id" element={<ProductView />} />
          <Route path="/Empresa" element={<Empresa />} />
          <Route path="/admin" element={<AdminProtegido />} />
          {/* Aquí puedes agregar más rutas si es necesario */}
        </Routes>
      </main>
    </CarProvider>
    </ToastProvider>
    </>
  )
}