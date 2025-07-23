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
      className="flex flex-col md:flex-row items-stretch justify-between w-full min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-950 overflow-hidden px-[15px]"
    >
      {/* Pilar izquierdo: imágenes grandes pegadas a la pared */}
      <div className="flex flex-col items-center justify-center gap-10 md:gap-16 max-w-xs w-full md:w-1/4">
        <img
          src={persona1}
          alt="Skater 1"
          className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-2xl border-4 border-blue-600"
        />
        <img
          src={persona2}
          alt="Skater 2"
          className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-2xl border-4 border-blue-600"
        />
      </div>
      {/* Texto alineado a la izquierda, como libro */}
      <div className="flex flex-col justify-center max-w-2xl w-full px-4 py-12 text-left">
        <h2 className="mb-6 text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-xl">
          Recomendado por{" "}
          <span className="text-blue-500">skaters profesionales</span>
        </h2>
        <p className="mb-8 text-lg md:text-2xl text-gray-200">
          Patinadores de todo tipo eligen nuestros rodamientos por su
          resistencia, velocidad y suavidad.
          <br />
          Están diseñados para soportar el desgaste y sesiones intensas,
          ofreciendo el máximo rendimiento en cada truco.
          <br />
          ¿Qué esperas para probarlos? Consigue los tuyos y siente la
          diferencia.
          <br />
          <span className="font-bold text-blue-400">
            Los skaters ya usan LORANG. ¿Y tú?
          </span>
        </p>
      </div>
      {/* Pilar derecho: imagen grande pegada a la pared */}
      <div className="flex flex-col items-center justify-center max-w-xs w-full md:w-1/4">
        <img
          src={persona3}
          alt="Skater 3"
          className="w-full h-64 md:h-[420px] object-cover rounded-2xl shadow-2xl border-4 border-blue-600"
        />
      </div>
    </section>
  );
}