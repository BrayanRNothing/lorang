import logoo from "../pics/logoo.png";

export default function Empresa() {
  return (
    <section className="w-full min-h-screen bg-neutral-950 text-white pt-20 pb-16">
      
      {/* Hero section */}
      <div className="relative overflow-hidden">
        {/* Fondo con gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block mb-8 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              <img
                src={logoo}
                alt="Lorang"
                className="w-32 h-32 mx-auto relative z-10"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent">
                El Origen de Lorang
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
          </div>
        </div>
      </div>

      {/* Historia principal */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="relative p-8 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                Lorang nació de la pasión de <span className="font-bold text-blue-400">Angel Mtz</span>, skater desde 2009. Creció rodeado de las marcas más icónicas del skate y desde joven mostró una visión clara: crear su propia marca.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative p-8 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                Tras varios intentos y años de aprendizaje, en 2018 decidió dar vida a Lorang, una marca mexicana con el objetivo de elevar la cultura skate y ofrecer productos de calidad mundial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Nuestra Historia
          </span>
        </h2>
        
        <div className="relative">
          {/* Línea vertical decorativa */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500" />
          
          <div className="space-y-12">
            {/* 2018 */}
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:text-right lg:pr-16">
                <div className="inline-block">
                  <span className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-full shadow-lg shadow-blue-500/50">
                    2018
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mt-4 mb-3">Nace Lorang</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Lorang lanza su primera colección de ropa diseñada especialmente para skaters. Prendas cómodas, resistentes y con diseños urbanos que rápidamente se volvieron favoritas en la escena local.
                </p>
              </div>
              <div className="hidden lg:block" />
              
              {/* Punto en la línea */}
              <div className="hidden lg:block absolute left-1/2 top-8 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 shadow-lg shadow-blue-500/50" />
            </div>

            {/* 2020 */}
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div className="hidden lg:block" />
              <div className="lg:pl-16">
                <div className="inline-block">
                  <span className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg font-bold rounded-full shadow-lg shadow-amber-500/50">
                    2020
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mt-4 mb-3">Lorang SkateShop</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Abrimos nuestra primera tienda física: Lorang SkateShop. Un punto de encuentro para la comunidad, donde apoyamos eventos locales y patrocinamos a jóvenes talentos.
                </p>
              </div>
              
              {/* Punto en la línea */}
              <div className="hidden lg:block absolute left-1/2 top-8 w-4 h-4 bg-amber-500 rounded-full -translate-x-1/2 shadow-lg shadow-amber-500/50" />
            </div>

            {/* 2023 */}
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:text-right lg:pr-16">
                <div className="inline-block">
                  <span className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-bold rounded-full shadow-lg shadow-green-500/50">
                    2023
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mt-4 mb-3">Primeros Rodamientos</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Tras años de desarrollo, lanzamos nuestros primeros rodamientos Lorang. Fabricados con materiales de alta calidad, posicionaron a la marca a nivel nacional.
                </p>
              </div>
              <div className="hidden lg:block" />
              
              {/* Punto en la línea */}
              <div className="hidden lg:block absolute left-1/2 top-8 w-4 h-4 bg-green-500 rounded-full -translate-x-1/2 shadow-lg shadow-green-500/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Visión */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-purple-900/30 border border-blue-500/30 p-12 md:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nuestra Visión
              </span>
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed max-w-4xl">
              En Lorang, nuestra visión es convertirnos en una marca líder en el mercado de rodamientos y accesorios para skaters, tanto a nivel nacional como internacional. Nos enfocamos en la calidad, la innovación y el apoyo a la comunidad, buscando ser un aliado de talentos mexicanos y brindar oportunidades a skaters emergentes para que alcancen su máximo potencial.
            </p>
          </div>
        </div>
      </div>

      {/* Rodamiento - Info técnica */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-10 md:p-14 border border-neutral-700">
          <h2 className="text-3xl md:text-4xl font-black mb-8">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ¿Cómo es un rodamiento Lorang?
            </span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Nuestros rodamientos están diseñados para máxima velocidad, resistencia y suavidad. Cada componente cumple una función esencial:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-neutral-800/50 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Anillos</h4>
                <p className="text-gray-400">Acero para mayor durabilidad</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-neutral-800/50 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Bolas</h4>
                <p className="text-gray-400">De Tungsteno para 0 deformaciones</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-neutral-800/50 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Retenedor</h4>
                <p className="text-gray-400">Mantiene la lubricación y protege</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-neutral-800/50 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Cubrepolvo</h4>
                <p className="text-gray-400">Fácil de quitar para mantenimiento</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              ¿Listo para rodar con Lorang?
            </h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Únete a la comunidad y descubre todo lo que tenemos para ti
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.instagram.com/lorang_mx"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-pink-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-pink-500/50 hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              
              <a
                href="https://www.facebook.com/lorangmx"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              
              <a
                href="/Catalogo"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-2xl hover:shadow-white/20 hover:scale-105"
              >
                Ver Catálogo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}