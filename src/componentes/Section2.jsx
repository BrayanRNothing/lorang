import f1 from "../pics/set1/f1.jpeg";
import persona1 from "../pics/persona1.jpeg";
import persona2 from "../pics/persona2.jpeg";
import persona3 from "../pics/persona3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Section2() {
  return (
    <section
      id="Section2"
      className="flex flex-col items-center justify-center w-full min-h-screen md:flex-row bg-gradient-to-b from-neutral-950 via-black to-neutral-950"
    >
      {/* Lado izquierdo: texto y CTA */}
      <div className="flex flex-col items-start justify-center w-full px-8 py-12 md:w-1/2 md:px-16">
        <h2 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-5xl drop-shadow-lg">
          Recomendado por{" "}
          <span className="text-blue-500">skaters profesionales</span>
        </h2>
        <p className="max-w-xl mb-8 text-lg text-gray-200 md:text-xl">
          Descubre productos probados y recomendados por los mejores skaters del
          mundo. Tablas, accesorios y más, seleccionados por su{" "}
          <span className="font-semibold text-blue-400">rendimiento</span> y{" "}
          <span className="font-semibold text-blue-400">durabilidad</span>. ¡Patina
          con lo mejor y destaca en cada truco!
        </p>
        
      </div>

      {/* Lado derecho: cuadrícula de imágenes con efecto */} 
      <div className="w-full grid-rows-1 px-10 rounded md:px-0 md:w-1/4 rounded-box carousel md:top-20 ">
          <Swiper
                         modules={[Autoplay,  Pagination]}
                         autoplay={{ delay: 3000 }}
                         pagination={{ clickable: true }}
                         loop={true}
                         className="w-full"
                     >
                         <SwiperSlide>
                             <img src={persona1} className="w-full " alt="foto" />
                         </SwiperSlide>
                         <SwiperSlide>
                          <img src={persona2} className="w-full  alt=foto2" />
                         </SwiperSlide>
                         <SwiperSlide>
                          <img src={persona3} className="w-full  alt=foto2" />
                         </SwiperSlide>
                         
                     </Swiper>
      </div>
    </section>
  );
}