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
          <h1 className="text-4xl font-bold text-gray-100 md:text-7xl">
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
          <p className="max-w-xl text-lg leading-relaxed text-gray-300">
            Desde Monterrey, traemos rodamientos de skate diseñados con la más alta calidad.
            Están recubiertos con óxido negro, lo que los hace más resistentes y duraderos,
            ideales para lograr <span className="font-semibold text-white">kickflips perfectos </span>
            y un rendimiento excepcional.
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
