import estructura from "../pics/xdxd/estructura.jpeg";
import playera from "../pics/dddd/playera.jpeg";
import producto1 from "../pics/dddd/producto1.jpeg";
import tienda from "../pics/dddd/tienda.jpeg";
import logoo from "../pics/logoo.png";
import fotopro from "../pics/fotopro.jpeg";

export default function Empresa() {
  return (
    <section className="flex flex-col items-center w-full bg-neutral-950 text-white">
      {/* Sección 1: Creador y Origen */}
      <div className="flex flex-col items-center w-full max-w-5xl gap-10 px-4 py-16 md:flex-row">
        <img
          src={logoo}
          alt="Creador de Lorang"
          className="object-cover w-full max-w-xs border-2 shadow-xl rounded-2xl border-neutral-800"
        />
        <div className="flex flex-col items-start flex-1">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl drop-shadow-lg">
            El Origen de <span className="text-blue-500">Lorang</span>
          </h1>
          <p className="mb-4 text-lg text-justify md:text-xl text-gray-300"> 
            Lorang nació de la pasión de <span className="font-bold text-blue-400">Angel Mtz</span>, skater desde 2009. Creció rodeado de las marcas más icónicas del skate y desde joven mostró una visión clara: crear su propia marca. Tras varios intentos y años de aprendizaje, en 2018 decidió dar vida a Lorang, una marca mexicana con el objetivo de elevar la cultura skate y ofrecer productos de calidad mundial.
          </p>
          <span className="px-4 py-1 text-xs font-semibold text-blue-300 bg-blue-900 rounded-full">#FundadorLorang</span>
        </div>
      </div>

      {/* Sección 2: Línea del tiempo de eventos importantes */}
      <div className="w-full max-w-5xl px-4 py-10">
        <h2 className="mb-8 text-3xl font-bold text-center text-white">Nuestra Historia en Momentos</h2>
        <div className="flex flex-col gap-10">
          {/* Evento 1 */}
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <img
              src={playera}
              alt="Primer producto"
              className="object-cover w-full max-w-xs border shadow-lg h-60 rounded-xl border-neutral-800"
              style={{ minHeight: "240px", maxHeight: "240px" }}
            />
            <div>
              <h3 className="mb-2 text-xl font-bold text-blue-400">2018: Nace Lorang</h3>
              <p className="text-justify text-gray-300">
                En 2018, Lorang lanza su primera colección de ropa diseñada especialmente para skaters. Prendas cómodas, resistentes y con diseños urbanos que rápidamente se volvieron favoritas en la escena local, marcando el inicio de la marca en el mundo del skate mexicano.
              </p>
            </div>
          </div>
          {/* Evento 2 */}
          <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
            <img
              src={tienda}
              alt="Lorang SkateShop"
              className="object-cover w-full max-w-xs border shadow-lg h-60 rounded-xl border-neutral-800"
              style={{ minHeight: "240px", maxHeight: "240px" }}
            />
            <div>
              <h3 className="mb-2 text-xl font-bold text-amber-400">2020: Surge Lorang SkateShop</h3>
              <p className="text-justify text-gray-300">
                En 2020, abrimos nuestra primera tienda física: Lorang SkateShop. Este espacio se convirtió en un punto de encuentro para la comunidad, donde además de vender productos, apoyamos eventos locales y patrocinamos a jóvenes talentos, impulsando la cultura skate en la región.
              </p>
            </div>
          </div>
          {/* Evento 3 */}
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <img
              src={producto1}
              alt="Primeros rodamientos Lorang"
              className="object-cover w-full max-w-xs border shadow-lg h-60 rounded-xl border-neutral-800"
              style={{ minHeight: "240px", maxHeight: "240px" }}
            />
            <div>
              <h3 className="mb-2 text-xl font-bold text-green-400">2023: Se crean los primeros rodamientos Lorang</h3>
              <p className="text-justify text-gray-300">
                En 2023, tras años de desarrollo y pruebas, lanzamos nuestros primeros rodamientos Lorang. Fabricados con materiales de alta calidad y pensados para el alto rendimiento, estos rodamientos posicionaron a la marca a nivel nacional y nos permitieron llegar a skaters de todo México.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección 3: Visión de la marca */}
      <div className="flex flex-col items-center w-full max-w-5xl gap-10 px-4 py-16 md:flex-row">
        <div className="flex flex-col items-start flex-1">
          <h2 className="mb-4 text-3xl font-bold text-white">Nuestra Visión</h2>
          <p className="mb-4 text-lg text-justify text-gray-300">
            En Lorang, nuestra visión es convertirnos en una marca líder en el mercado de rodamientos y accesorios para skaters, tanto a nivel nacional como internacional. Nos enfocamos en la calidad, la innovación y el apoyo a la comunidad, buscando ser un aliado de talentos mexicanos y brindar oportunidades a skaters emergentes para que alcancen su máximo potencial.
          </p>
        </div>
       
      </div>

      {/* Sección 4: Estructura de un rodamiento */}
      <div className="flex flex-col items-center w-full max-w-5xl gap-10 px-4 py-16 md:flex-row">
        <img
          src={estructura}
          alt="Estructura de un rodamiento"
          className="object-contain w-full max-w-md border-2 shadow-xl rounded-2xl border-neutral-800 bg-neutral-900"
        />
        <div className="flex flex-col items-start flex-1">
          <h2 className="mb-4 text-3xl font-bold text-white">¿Cómo es un rodamiento Lorang?</h2>
          <p className="mb-2 text-justify text-gray-300">
            Nuestros rodamientos están diseñados para máxima velocidad, resistencia y suavidad. Cada componente cumple una función esencial para garantizar el mejor desempeño en cada rodada:
          </p>
          <ul className="pl-6 space-y-1 list-disc text-gray-300">
            <li><span className="font-semibold text-blue-400">Anillos:</span> Acero para mayor durabilidad.</li>
            <li><span className="font-semibold text-blue-400">Bolas:</span> De Tungsteno para 0 deformaciones</li>
            <li><span className="font-semibold text-blue-400">Retenedor:</span> Mantiene la lubricación y protege .</li>
            <li><span className="font-semibold text-blue-400">Cubrepolvo:</span> Fácil de quitar para mantenimiento.</li>
          </ul>
        </div>
      </div>

      {/* Sección 5: ¿Qué es el ABEC? */}
      <div className="flex flex-col items-center w-full max-w-5xl gap-10 px-4 py-16 md:flex-row-reverse">
        <div className="flex flex-col items-start flex-1">
          <h2 className="mb-4 text-3xl font-bold text-white">¿Qué es el ABEC?</h2>
          <p className="mb-2 text-justify text-gray-300">
            El ABEC es una escala internacional que mide la precisión y tolerancia de los rodamientos. En Lorang, utilizamos estándares de alta calidad para asegurar el mejor desempeño, aunque sabemos que la verdadera diferencia se siente en cada rodada, más allá de un simple número.
          </p>
          <span className="px-4 py-1 text-xs font-semibold rounded-full bg-amber-900 text-amber-300">#RodamientosLorang</span>
        </div>
      </div>

      {/* Sección 6: Diseños importantes */}
      <div className="w-full max-w-5xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold text-center text-white">Diseños que Marcan</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center p-4 border shadow-lg bg-neutral-900 border-neutral-800 rounded-xl">
            <img
              src={fotopro}
              alt="Diseño 1"
              className="object-cover w-full h-48 mb-3 rounded-lg"
            />
            <span className="mb-1 font-bold text-blue-400">Edición Limitada 2023</span>
            <span className="text-sm text-center text-gray-300">Colección inspirada en la cultura urbana y el arte callejero mexicano, reflejando la esencia de la marca.</span>
          </div>
          <div className="flex flex-col items-center p-4 border shadow-lg bg-neutral-900 border-neutral-800 rounded-xl">
            <img
              src={fotopro}
              alt="Diseño 2"
              className="object-cover w-full h-48 mb-3 rounded-lg"
            />
            <span className="mb-1 font-bold text-amber-400">Colaboración con Skaters</span>
            <span className="text-sm text-center text-gray-300">Diseños desarrollados junto a riders de la comunidad Lorang, fusionando creatividad y experiencia real.</span>
          </div>
          <div className="flex flex-col items-center p-4 border shadow-lg bg-neutral-900 border-neutral-800 rounded-xl">
            <img
              src={fotopro}
              alt="Diseño 3"
              className="object-cover w-full h-48 mb-3 rounded-lg"
            />
            <span className="mb-1 font-bold text-green-400">Serie "Rueda Libre"</span>
            <span className="text-sm text-center text-gray-300">Una serie que celebra la libertad, la creatividad y la pasión por el skate en cada detalle.</span>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="flex flex-col items-center justify-between w-full max-w-5xl gap-6 px-4 pb-20 mt-16 md:flex-row">
        <div className="flex flex-col items-start">
          <h3 className="mb-2 text-2xl font-bold text-white">¿Listo para rodar con Lorang?</h3>
          <p className="mb-4 text-base text-justify text-gray-300">Únete a la comunidad, síguenos en redes y descubre todo lo que tenemos para ti.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Instagram</a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Facebook</a>
            <a href="https://wa.me/528112345678" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">WhatsApp</a>
          </div>
        </div>
        <a
          href="/Catalogo"
          className="px-10 mt-6 shadow-lg btn btn-primary btn-lg md:mt-0"
        >
          Ver catálogo
        </a>
      </div>
    </section>
  );
}