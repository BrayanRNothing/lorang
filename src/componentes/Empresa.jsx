import logoo from "../pics/logoo.png";

export default function Empresa() {
  const hitos = [
    {
      year: "2018",
      title: "Nace Lorang",
      phase: "Inicio",
      color: "from-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/40",
      text: "Lanzamos nuestra primera coleccion de ropa para skaters: comoda, resistente y con identidad urbana que conecto de inmediato con la escena local.",
    },
    {
      year: "2020",
      title: "Abre Lorang SkateShop",
      phase: "Comunidad",
      color: "from-orange-500 to-amber-600",
      glow: "shadow-orange-500/40",
      text: "Abrimos nuestra primera tienda fisica, un punto de encuentro para riders, eventos y apoyo real a talento emergente.",
    },
    {
      year: "2023",
      title: "Lanzamiento de Rodamientos",
      phase: "Expansion",
      color: "from-emerald-500 to-green-600",
      glow: "shadow-emerald-500/40",
      text: "Despues de anos de pruebas, presentamos los primeros rodamientos Lorang con calidad premium y presencia en todo Mexico.",
    },
    {
      year: "2026",
      title: "Evolucion Digital",
      phase: "Proyeccion",
      color: "from-fuchsia-500 to-pink-600",
      glow: "shadow-fuchsia-500/40",
      text: "Consolidamos la experiencia online para acercar la marca a mas skaters y fortalecer una comunidad conectada en todo el pais.",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/40 text-slate-900 pt-20 pb-16">
      
      {/* Hero section */}
      <div className="relative overflow-hidden">
        {/* Fondo con gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-transparent to-cyan-300/20" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block mb-8 relative">
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full" />
              <img
                src={logoo}
                alt="Lorang"
                className="w-32 h-32 mx-auto relative z-10"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
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
            <div className="relative p-8 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 overflow-hidden group hover:border-blue-400/60 transition-all duration-300 shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
              <p className="text-slate-700 text-lg leading-relaxed relative z-10">
                Lorang nació de la pasión de <span className="font-bold text-blue-400">Angel Mtz</span>, skater desde 2009. Creció rodeado de las marcas más icónicas del skate y desde joven mostró una visión clara: crear su propia marca.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative p-8 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 overflow-hidden group hover:border-blue-400/60 transition-all duration-300 shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <p className="text-slate-700 text-lg leading-relaxed relative z-10">
                Tras varios intentos y años de aprendizaje, en 2018 decidió dar vida a Lorang, una marca mexicana con el objetivo de elevar la cultura skate y ofrecer productos de calidad mundial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-7 md:p-12 shadow-sm">
          <div className="absolute -top-28 -left-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />

          <div className="relative z-10 mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-cyan-700">Timeline</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              La Ruta de <span className="bg-gradient-to-r from-cyan-700 to-fuchsia-700 bg-clip-text text-transparent">Lorang</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-slate-600 text-lg">
              Cada etapa representa un salto real de la marca: del barrio al alcance nacional, siempre junto a la comunidad skate.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-400/40 via-slate-300 to-fuchsia-400/40 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {hitos.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <article key={item.year} className="relative grid grid-cols-1 md:grid-cols-2 md:gap-12">
                    <div
                      className={`relative rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 ${
                        isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2"
                      }`}
                    >
                      <div className="mb-4 flex flex-wrap items-center gap-2 md:justify-end">
                        {!isLeft && <span className="inline-flex h-2.5 w-2.5 rounded-full bg-slate-300" />}
                        <span className={`inline-block rounded-full bg-gradient-to-r ${item.color} px-4 py-1 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg ${item.glow}`}>
                          {item.year}
                        </span>
                        <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
                          {item.phase}
                        </span>
                        {isLeft && <span className="inline-flex h-2.5 w-2.5 rounded-full bg-slate-300" />}
                      </div>

                      <h3 className="mb-3 text-2xl md:text-3xl font-black text-slate-900">{item.title}</h3>
                      <p className="text-slate-700 leading-relaxed text-base md:text-lg">{item.text}</p>

                      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${58 + index * 12}%` }}
                        />
                      </div>
                    </div>

                    <div
                      className={`pointer-events-none absolute left-3 top-8 h-4 w-4 rounded-full border-4 border-slate-50 bg-gradient-to-r ${item.color} shadow-lg ${item.glow} md:left-1/2 md:-translate-x-1/2`}
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Visión */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100/80 via-white to-purple-100/70 border border-blue-200/70 p-12 md:p-16 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Nuestra Visión
              </span>
            </h2>
            <p className="text-slate-700 text-xl leading-relaxed max-w-4xl">
              En Lorang, nuestra visión es convertirnos en una marca líder en el mercado de rodamientos y accesorios para skaters, tanto a nivel nacional como internacional. Nos enfocamos en la calidad, la innovación y el apoyo a la comunidad, buscando ser un aliado de talentos mexicanos y brindar oportunidades a skaters emergentes para que alcancen su máximo potencial.
            </p>
          </div>
        </div>
      </div>

      {/* Rodamiento - Info técnica */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 md:p-14 border border-slate-200 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-black mb-8">
            <span className="bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
              ¿Cómo es un rodamiento Lorang?
            </span>
          </h2>
          <p className="text-slate-600 mb-10 text-lg">
            Nuestros rodamientos están diseñados para máxima velocidad, resistencia y suavidad. Cada componente cumple una función esencial:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400/60 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Anillos</h4>
                <p className="text-slate-600">Acero para mayor durabilidad</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400/60 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Bolas</h4>
                <p className="text-slate-600">De Tungsteno para 0 deformaciones</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400/60 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Retenedor</h4>
                <p className="text-slate-600">Mantiene la lubricación y protege</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400/60 transition-all">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Cubrepolvo</h4>
                <p className="text-slate-600">Fácil de quitar para mantenimiento</p>
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