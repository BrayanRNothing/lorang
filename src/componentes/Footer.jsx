export default function Footer() {
  return (
    <footer className="flex flex-col w-full gap-4 px-2 py-4 md:px-8 md:py-8 bg-neutral-950 md:gap-8">
      <div className="flex flex-col w-full gap-4 mx-auto md:flex-row md:items-center md:justify-between md:gap-16 max-w-7xl">
        {/* Links: siempre centrados y en fila */}
        <div className="flex flex-row items-start justify-center order-2 w-full gap-2 overflow-x-auto md:order-1 md:w-auto md:gap-16">
          <nav className="flex flex-col gap-1 md:gap-2 min-w-[100px] items-center">
            <h6 className="text-xs text-center text-white footer-title md:text-base">Servicios</h6>
            <a className="text-xs text-center link link-hover text-neutral-300 md:text-base">Ayuda</a>
            <a className="text-xs text-center link link-hover text-neutral-300 md:text-base">Desarroladores</a>
            <a className="text-xs text-center link link-hover text-neutral-300 md:text-base">Advertisements</a>
          </nav>
          <nav className="flex flex-col gap-1 md:gap-2 min-w-[100px] items-center">
            <h6 className="text-xs text-center text-white footer-title md:text-base">Compañia</h6>
            <a className="text-xs text-center link link-hover text-neutral-300 md:text-base">About us</a>
            <a className="text-xs text-center link link-hover text-neutral-300 md:text-base">Contacto</a>
            <a className="text-xs text-center link link-hover text-neutral-300 md:text-base">Trbajos</a>
          </nav>
          <nav className="flex flex-col gap-1 md:gap-2 min-w-[100px] items-center">
            <h6 className="text-xs text-center text-white footer-title md:text-base">Social</h6>
            <div className="flex flex-row justify-center gap-2 md:gap-4">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="w-4 h-4 fill-current text-neutral-300 md:w-6 md:h-6"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="w-4 h-4 fill-current text-neutral-300 md:w-6 md:h-6"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="w-4 h-4 fill-current text-neutral-300 md:w-6 md:h-6"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </a>
            </div>
          </nav>
        </div>
        {/* Suscripción: arriba en móvil, derecha en PC, SIEMPRE centrada en móvil */}
        <div className="order-1 md:order-2 flex flex-col items-center w-full min-w-[180px] max-w-xs md:w-[340px] md:ml-2 md:items-end md:justify-end self-center md:self-end">
          <h3 className="mb-1 text-sm font-semibold text-center text-white md:mb-2 md:text-xl md:text-right">Suscríbete para recibir Novedades</h3>
          <form className="flex justify-center w-full max-w-xs gap-1 md:gap-2 md:justify-end">
            <input type="email" placeholder="Tu correo" className="w-full py-1 text-xs text-white input input-bordered bg-neutral-800 md:text-base md:py-2" />
            <button className="btn btn-primary btn-sm md:btn-md">Suscribirse</button>
          </form>
        </div>
      </div>
    </footer>
  )
}