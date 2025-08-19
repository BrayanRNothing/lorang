import React from 'react';
import { BoltIcon, ShieldCheckIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function Section2() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen text-white bg-gradient-to-b from-neutral-900 to-neutral-950 py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Tecnología que Impulsa tu Patinada
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed mb-16">
          En Lorang, cada rodamiento es una obra de ingeniería. Nuestro compromiso con la innovación se traduce en una experiencia de patinaje superior. Descubre cómo la precisión y los materiales avanzados se unen para ofrecerte velocidad, durabilidad y una suavidad inigualable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Punto Clave 1: Durabilidad Extrema */}
          <div className="flex flex-col items-center p-6 bg-neutral-800 rounded-lg shadow-xl transform transition-transform hover:scale-105 duration-300">
            <ShieldCheckIcon className="h-16 w-16 text-green-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Durabilidad Extrema</h3>
            <p className="text-md leading-relaxed">
              Con nuestro exclusivo recubrimiento de óxido negro, los rodamientos Lorang resisten los impactos más duros y las condiciones más exigentes, prolongando su vida útil y tu rendimiento.
            </p>
          </div>

          {/* Punto Clave 2: Velocidad Sin Límites */}
          <div className="flex flex-col items-center p-6 bg-neutral-800 rounded-lg shadow-xl transform transition-transform hover:scale-105 duration-300">
            <RocketLaunchIcon className="h-16 w-16 text-blue-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Velocidad Sin Límites</h3>
            <p className="text-md leading-relaxed">
              Diseñados con tolerancias mínimas y lubricantes de alto rendimiento, nuestros rodamientos minimizan la fricción, permitiéndote alcanzar velocidades impresionantes con menos esfuerzo.
            </p>
          </div>

          {/* Punto Clave 3: Patinada Suave y Silenciosa */}
          <div className="flex flex-col items-center p-6 bg-neutral-800 rounded-lg shadow-xl transform transition-transform hover:scale-105 duration-300">
            <BoltIcon className="h-16 w-16 text-yellow-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Patinada Suave y Silenciosa</h3>
            <p className="text-md leading-relaxed">
              La ingeniería de precisión y los materiales de alta calidad aseguran un giro fluido y silencioso, absorbiendo vibraciones para una conexión perfecta con tu tabla.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
