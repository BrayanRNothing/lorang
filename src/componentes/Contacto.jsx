export default function Contacto() {
  return (
    <section className="flex flex-col md:flex-row items-stretch justify-center w-full min-h-[calc(100vh-2.875rem)] bg-neutral-950 text-white">
      {/* Main grid */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto border-neutral-800 md:divide-x divide-neutral-800">
        {/* Formulario */}
        <div className="flex flex-col justify-center flex-1 px-4 py-8 md:px-8 md:py-16">
          <div className="flex flex-col items-center justify-center min-h-full">
            <h2 className="w-full mb-8 text-3xl font-bold text-center text-white">Envíanos un mensaje</h2>
            <form className="flex flex-col w-full max-w-sm gap-6">
              <div className="flex w-full gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-1/2 text-white input input-bordered bg-neutral-800 border-neutral-700"
                  required
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-1/2 text-white input input-bordered bg-neutral-800 border-neutral-700"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Asunto"
                className="w-full text-white input input-bordered bg-neutral-800 border-neutral-700"
                required
              />
              <textarea
                placeholder="¿En qué podemos ayudarte?"
                className="w-full text-white textarea textarea-bordered bg-neutral-800 border-neutral-700"
                rows={5}
                required
              />
              <button className="transition-transform shadow btn btn-primary btn-block hover:scale-105">
                Enviar mensaje
              </button>
              <p className="text-xs text-center text-gray-400">
                Te responderemos lo antes posible a tu correo.
              </p>
            </form>
          </div>
        </div>

        {/* Datos de contacto y redes */}
        <div className="flex flex-col justify-center flex-1 px-4 py-8 md:px-8 md:py-16 border-t border-neutral-800 md:border-t-0">
          <div className="flex flex-col items-center justify-center min-h-full">
            <h2 className="w-full mb-8 text-3xl font-bold text-center text-white">Datos de contacto</h2>
            <ul className="w-full max-w-sm mb-10 space-y-5 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4" /></svg>
                </span>
                <a href="mailto:contacto@ejemplo.com" className="transition-colors hover:text-primary">
                  LorangMx@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
                </span>
                <a href="tel:+528112345678" className="transition-colors hover:text-primary">
                  +52 81 1222 3456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m10 0V6a4 4 0 00-8 0v2m8 0H7" /></svg>
                </span>
                <span>Calle Ficticia 123, Monterrey, NL</span>
              </li>
            </ul>
            <h3 className="w-full mb-4 text-xl font-semibold text-center text-white">Redes Sociales</h3>
            <div className="flex w-full max-w-sm gap-3 mb-8">
              <a
                href="https://wa.me/528112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 transition-transform shadow btn btn-success btn-sm hover:scale-105"
              >
                WhatsApp
              </a>
              <a
                href="https://www.facebook.com/ejemplo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 transition-transform shadow btn btn-primary btn-sm hover:scale-105"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/ejemplo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 transition-transform shadow btn btn-secondary btn-sm hover:scale-105"
              >
                Instagram
              </a>
            </div>
            <div className="w-full text-xs text-center text-gray-400">
              Horario de atención: Lunes a Sabado 9:00am - 6:00pm
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}