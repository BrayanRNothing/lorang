import { Typewriter } from "react-simple-typewriter";
import React, { useRef} from "react";
import f1 from "../pics/set1/f1.jpeg";
import f2 from "../pics/set1/f2.jpeg";

import Banner from "./Banner";
import ScrollButton from "./ScrollButton";


export default function Section1() {
  return (
    <>
      <div className="absolute w-full h-screen rounded-2xl ">

      <div className="absolute space-y-6 text-left top-24 left-12 md:w-1/2">
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
    y  un rendimiento excepcional.
  </p>

  <ScrollButton />
</div>
  
            <Banner />
{/*
          <div className="absolute flex w-20 overflow-hidden border border-blue-500 rounded-lg shadow-lg md:w-1/4 right-15 top-12">
            <img src={f1} alt="Skate" className="object-cover w-full h-auto" />
          </div>
         */}
      </div>
    </>
  );
}
