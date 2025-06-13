import f1 from "../pics/set1/f1.jpeg";
import persona1 from "../pics/persona1.jpeg";
import persona2 from "../pics/persona2.jpeg";
import persona3 from "../pics/persona3.jpeg";

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
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-6 p-8 md:w-1/2">
        {[persona1, persona2, persona3, f1].map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden border-2 shadow-xl border-neutral-950 group rounded-xl bg-neutral-900"
          >
            <img
              src={img}
              alt={`Skater ${i + 1}`}
              className="object-cover w-full h-56 transition-transform duration-500 md:h-64 group-hover:scale-105"
            />
            <div className="absolute inset-0 transition-all duration-500 bg-black bg-opacity-0 group-hover:bg-opacity-30" />
            {/* Puedes agregar nombre o frase aquí si quieres */}
          </div>
        ))}
      </div>
    </section>
  );
}