import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          {/* Logo y Copyright */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">LorangMX</h2>
            <p className="text-sm">&copy; {new Date().getFullYear()} LorangMX. Todos los derechos reservados.</p>
          </div>

          {/* Navegación */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Navegación</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-400 transition-colors duration-300">Inicio</a></li>
              <li><a href="/Catalogo" className="hover:text-gray-400 transition-colors duration-300">Catálogo</a></li>
              <li><a href="/Contacto" className="hover:text-gray-400 transition-colors duration-300">Contacto</a></li>
              <li><a href="/Empresa" className="hover:text-gray-400 transition-colors duration-300">Empresa</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Contacto</h3>
            <p className="text-sm">Email: <a href="mailto:lorangMX@gmail.com" className="hover:text-gray-400 transition-colors duration-300">tu_email@lorangmx.com</a></p>
            <p className="text-sm">Teléfono: <a href="tel:+528119817118" className="hover:text-gray-400 transition-colors duration-300">+52 8119817118</a></p>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.instagram.com/lorang_mx" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.facebook.com/lorangmx" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300">
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal (opcional, puedes añadir más enlaces aquí) */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm">
          <a href="/politica-privacidad" className="hover:text-gray-400 transition-colors duration-300 mx-2">Política de Privacidad</a>
          <span className="mx-2">|</span>
          <a href="/terminos-condiciones" className="hover:text-gray-400 transition-colors duration-300 mx-2">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}
