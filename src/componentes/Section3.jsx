import React from 'react';
import { Link } from 'react-router-dom';
import l2Image from '../pics/l2.png'; // Importa la imagen

export default function Section3() {
  return (
    <section className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-b from-neutral-950 to-black text-white overflow-hidden">
      {/* Contenido de texto (izquierda) - dentro del contenedor principal */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-start min-h-screen z-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left p-8 md:p-0 md:w-1/2">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            ¿Qué esperas para <span className="text-blue-500">rodar</span>?
          </h2>
          <p className="max-w-xl text-lg md:text-xl leading-relaxed mb-10">
            Descubre la diferencia LorangMX. Nuestros rodamientos están diseñados para llevar tu patinada al siguiente nivel. Velocidad, durabilidad y suavidad inigualable te esperan.
          </p>
          <Link 
            to="/Catalogo" 
            className="inline-block px-12 py-6 text-xl font-bold text-white bg-blue-600 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase tracking-wider"
          >
            Explora el Catálogo
          </Link>
        </div>
      </div>

      {/* Imagen (derecha) - Posicionada absolutamente */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full md:w-1/2"
      >
        <img 
          src={l2Image} 
          alt="Skater rodando con rodamientos LorangMX" 
          className="object-cover w-full h-full" 
          style={{ objectPosition: 'right center' }} 
        />
        {/* Opcional: Overlay sutil para que el texto de la izquierda resalte más si la imagen es muy clara */}
        <div className="absolute inset-0 bg-black opacity-20 md:hidden"></div> 
      </div>
    </section>
  );
}