import { Typewriter } from "react-simple-typewriter";
import React from "react";
import f1 from "../pics/set1/f1.jpeg";
import Banner from "./Banner";
import ScrollButton from "./ScrollButton";

export default function Section1() {
  return (
    <>
      {/* Desktop layout */}
      <div className="absolute hidden w-full h-screen md:block rounded-2xl">
        <div className="absolute top-0 space-y-6 text-left sm:top-12 md:top-24 left-12 md:w-1/2">
          <h1
            className="text-4xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent drop-shadow-lg mb-2"
            style={{ fontFamily: 'Montserrat, serif', letterSpacing: '2px', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
          >
            QUIENES SOMOS
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-gray-300">
            Somos una marca de rodamientos, originaria de Monterrey N.L, y estamos enfocados
            a crear rodamientos duraderos, para una patinada veloz y suave. Nuestros rodamientios
            son tratados con un recubrimiento de<span className="font-semibold text-white">óxido negro</span>
          lo que los hace mas recistentes ante los impactos y medio ambiente en l cual nos desempeñamos patinando.
          </p>
          <ScrollButton />
        </div>
        <Banner />
      </div>

      {/* Mobile layout */}
      <div className="relative flex flex-col items-center block w-full min-h-screen pt-24 pb-8 md:hidden bg-neutral-950">
        <h1 className="mb-6 text-3xl font-bold text-gray-100">
          <Typewriter
            words={["LORANG.COM"]}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={90}
            deleteSpeed={50}
            delaySpeed={30000}
          />
        </h1>
        <img
          src={f1}
          alt="Skate"
          className="w-4/5 max-w-xs mb-6 shadow-lg rounded-xl"
        />
        <p className="px-2 mb-6 text-base text-center text-gray-300">
          Rodamientos premium desde Monterrey. Más resistentes, más rápidos, más Lorang.
        </p>
        <ScrollButton />
        <div className="w-full mt-8">
          {/* Banner oculto en móvil, si quieres mostrarlo aquí, quita 'hidden' */}
          {/* <Banner /> */}
        </div>
      </div>
    </>
  );
}
