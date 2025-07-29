import { useState } from 'react'
import viteLogo from '/vite.svg'
import '../App.css'
import reactLogo from '../assets/react.svg';

import Background from './Background'; // Ruta corregida
import Navbar from './Navbar'; // Ruta corregida
import Carousel from './Carousel'; // Ruta corregida

export default function Inicio() {
  return (
    <>
      <Background />
      
      <Carousel />      
    </>
  );
}