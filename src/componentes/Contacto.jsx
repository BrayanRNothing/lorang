import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram, FaClock } from 'react-icons/fa';

export default function Contacto() {
  return (
    <section className="w-full h-[100dvh] bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900 pt-20 pb-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto h-full flex flex-col">
        <div className="mb-5 sm:mb-6 text-center shrink-0">
          <p className="inline-block px-3 py-1 mb-3 text-[11px] tracking-widest uppercase rounded-full border border-blue-300 bg-blue-100 text-blue-700">
            Contacto
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">
            Hablemos de tu próximo setup
          </h1>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl lg:max-w-3xl mx-auto">
            Si tienes dudas de productos o pedidos, escríbenos y te respondemos rápido.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch flex-1 min-h-0">
          <aside className="lg:col-span-5 xl:col-span-4 space-y-3 sm:space-y-4 min-h-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 h-full flex flex-col shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-3">Canales directos</h2>
              <div className="space-y-2.5">
                <a
                  href="mailto:LorangMx@gmail.com"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 hover:border-blue-400 transition-colors"
                >
                  <FaEnvelope className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-500">Correo</p>
                    <p className="text-sm font-medium text-slate-800">LorangMx@gmail.com</p>
                  </div>
                </a>
                <a
                  href="tel:+528119817118"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 hover:border-blue-400 transition-colors"
                >
                  <FaPhone className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-500">Teléfono</p>
                    <p className="text-sm font-medium text-slate-800">+52 811 981 7118</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <FaMapMarkerAlt className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-500">Ubicación</p>
                    <p className="text-sm font-medium text-slate-800">Monterrey, Nuevo León, México</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <FaClock className="w-3.5 h-3.5 text-blue-600" />
                  <p className="text-xs sm:text-sm text-slate-600">L-V 9:00-6:00 | Sáb 10:00-2:00</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mt-3">
              <a
                href="https://wa.me/528119817118"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3 text-center hover:border-green-500/70 hover:bg-green-500/10 transition-all"
              >
                <FaWhatsapp className="w-5 h-5 mx-auto text-green-500" />
                <p className="text-[11px] mt-1.5 text-slate-600">WhatsApp</p>
              </a>
              <a
                href="https://www.facebook.com/lorangmx"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3 text-center hover:border-blue-500/70 hover:bg-blue-500/10 transition-all"
              >
                <FaFacebook className="w-5 h-5 mx-auto text-blue-500" />
                <p className="text-[11px] mt-1.5 text-slate-600">Facebook</p>
              </a>
              <a
                href="https://www.instagram.com/lorang_mx"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3 text-center hover:border-pink-500/70 hover:bg-pink-500/10 transition-all"
              >
                <FaInstagram className="w-5 h-5 mx-auto text-pink-500" />
                <p className="text-[11px] mt-1.5 text-slate-600">Instagram</p>
              </a>
            </div>
            </div>
          </aside>

          <div className="lg:col-span-7 xl:col-span-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 xl:p-7 shadow-xl shadow-slate-200/70 h-full flex flex-col min-h-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Envíanos un mensaje</h2>
            <form className="space-y-3.5 sm:space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 xl:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">Nombre completo</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 xl:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+52 81 1234 5678"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">Asunto</label>
                  <input
                    type="text"
                    placeholder="Pedido, dudas, colaboración..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="flex-1 min-h-0">
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">Mensaje</label>
                <textarea
                  rows={4}
                  placeholder="Cuéntanos en qué te podemos ayudar"
                  className="w-full h-full min-h-[110px] max-h-[180px] px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto min-w-[180px] px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                Enviar mensaje
              </button>

              <p className="text-xs sm:text-sm text-slate-500">Tiempo de respuesta aproximado: 24 a 48 horas.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}