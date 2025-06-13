import Footer from "./Footer";

export default function Section3() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center w-full min-h-[70vh] px-4 py-16 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
        <h2 className="mb-4 text-4xl font-extrabold text-center md:text-5xl drop-shadow-lg">
          ¿Listo para tu próxima compra?
        </h2>
        <p className="max-w-2xl mb-8 text-lg text-center text-blue-100 md:text-xl">
          Explora nuestro catálogo o contáctanos para atención personalizada.
          <br />
          ¡Queremos ayudarte a encontrar lo que buscas!
        </p>
        <div className="flex flex-col items-center justify-center w-full max-w-md gap-4 mb-12 md:flex-row">
          <a
            href="/Catalogo"
            className="w-full transition-transform shadow-lg btn btn-primary btn-lg md:w-auto hover:scale-105"
          >
            Ver Catálogo
          </a>
          <a
            href="/Contacto"
            className="w-full transition-transform shadow-lg btn btn-outline btn-lg md:w-auto hover:scale-105"
          >
            Contactar
          </a>
        </div>
        {/* Nueva sección de confianza y beneficios */}
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 mt-8 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 border rounded-lg bg-neutral-900 border-neutral-800">
            <span className="mb-2 text-blue-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span className="mb-1 font-bold text-white">Compra protegida</span>
            <span className="text-sm text-center text-neutral-400">
              Tus pagos y datos están seguros con Mercado Pago.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 border rounded-lg bg-neutral-900 border-neutral-800">
            <span className="mb-2 text-green-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </span>
            <span className="mb-1 font-bold text-white">
              Envío rápido y gratis
            </span>
            <span className="text-sm text-center text-neutral-400">
              Recibe tus productos en la puerta de tu casa sin costo extra.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 border rounded-lg bg-neutral-900 border-neutral-800">
            <span className="mb-2 text-yellow-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </span>
            <span className="mb-1 font-bold text-white">
              Atención personalizada
            </span>
            <span className="text-sm text-center text-neutral-400">
              ¿Dudas? Nuestro equipo te ayuda por WhatsApp o correo.
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}