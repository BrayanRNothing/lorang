import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import skateVideo from '../pics/skate-video.mp4'; // Import local video

const typewriterWords = [
  "Lorang.com",
  "Quienes somos?",
];

export default function Section1() {
  return (
    <section className="relative flex items-center justify-center w-full min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src={skateVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 text-white">
        <h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
          style={{ fontFamily: 'Montserrat, sans-serif', minHeight: '80px' }}
        >
          <Typewriter
            words={typewriterWords}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl leading-relaxed">
          Somos una marca de rodamientos originaria de Monterrey NL, enfocados en crear rodamientos duraderos y diseñados para una patinada veloz y suave. Nuestros rodamientos cuentan con recubrimiento de óxido negro, lo que los hace más resistentes ante impactos y el ambiente donde patinamos.
        </p>
        <a 
          href="#section2" 
          className="mt-8 inline-block px-8 py-4 text-lg font-semibold text-white transition-transform transform hover:scale-105 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Descubre más
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDownIcon className="h-8 w-8 text-white" />
      </div>
    </section>
  );
}
