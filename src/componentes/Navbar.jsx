import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CarContext";
import logoo from "../pics/logoo.png"

export default function Navbar() {
  const { cart, removeFromCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [empresaDropdown, setEmpresaDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Línea 15
  const empresaRef = useRef();
  const location = useLocation();
  // Estado para controlar la animación del logo
  const [logoSpin, setLogoSpin] = useState(false);

  // Efecto para ocultar navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Mostrar siempre el navbar cuando el carrito está abierto
  useEffect(() => {
    if (cartOpen) {
      setHideNav(false);
    }
  }, [cartOpen]);

  // Cierra el dropdown si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (empresaRef.current && !empresaRef.current.contains(event.target)) {
        setEmpresaDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Efecto para girar el logo cada vez que cambia la ruta
  useEffect(() => {
    setLogoSpin(true);
    const timeout = setTimeout(() => setLogoSpin(false), 1000); // Duración igual a la animación
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // Calcular total de productos (sumando cantidades)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calcular total $
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <nav className="w-full overflow-x-hidden shadow-md bg-neutral-950">
      <div className="flex items-center h-11.5 w-full">
        {/* Logo + Lorang alineado a la izquierda */}
        <div className="flex items-center flex-shrink-0">
          <a href="/" className="flex items-center text-xl font-semibold">
            <img
              src={logoo}
              alt="logo"
              className={`object-contain w-10 h-10 transition-transform duration-700 ease-out ${logoSpin ? 'animate-spin-once' : ''}`}
              style={{ animationDelay: '0.2s' }}
            />
            <span className="ml-2 text-lg font-bold tracking-wide text-white animate-fade-in-logo" style={{ animationDelay: '0.7s' }}>
              Lorang
            </span>
          </a>
        </div>
        {/* Menú PC (oculto en móvil) */}
        <div className="justify-end flex-1 hidden m-5 md:flex">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white">Inicio</Link>
            <Link to="/Catalogo" className="text-white">Productos</Link>
            <Link to="/Empresa" className="text-white">Empresa</Link>
            <Link to="/Contacto" className="text-white">Contacto</Link>
            <button className="relative" onClick={() => setCartOpen(true)} aria-label="Carrito">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 badge badge-primary badge-sm">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
        {/* Menú móvil: hamburguesa y carrito */}
        <div className="flex items-center justify-end flex-1 m-2 md:hidden">
          <button
            className="p-2 mr-2 text-white rounded focus:outline-none"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {/* Icono hamburguesa */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="relative" onClick={() => setCartOpen(true)} aria-label="Carrito">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 badge badge-primary badge-sm">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
      {/* Menú desplegable móvil */}
      <div
        className={`flex flex-row items-center justify-center w-full gap-4 px-4 py-0 border-b bg-neutral-950 border-neutral-800 md:hidden transition-all duration-300
        ${mobileMenuOpen ? 'animate-slide-down opacity-100 pointer-events-auto' : 'animate-slide-up opacity-0 pointer-events-none'}`}
        style={{height: mobileMenuOpen ? 'auto' : 0, overflow: 'hidden'}}
      >
        <Link to="/" className="py-2 text-white rounded hover:bg-neutral-800" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
        <Link to="/Catalogo" className="py-2 text-white rounded hover:bg-neutral-800" onClick={() => setMobileMenuOpen(false)}>Productos</Link>
        <Link to="/Empresa" className="py-2 text-white rounded hover:bg-neutral-800" onClick={() => setMobileMenuOpen(false)}>Empresa</Link>
        <Link to="/Contacto" className="py-2 text-white rounded hover:bg-neutral-800" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
      </div>
      {/* Drawer lateral del carrito y fondo para cerrar drawer se mantienen igual */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-neutral-900 shadow-lg z-[999] transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b bg-neutral-900">
          <h2 className="text-xl font-bold">Carrito</h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4 bg-neutral-900">
          {cart.length === 0 ? (
            <p className="text-gray-500">No hay productos en el carrito.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between pb-1 border-b"
                >
                  <span>
                    {item.title}
                    {item.quantity > 1 && (
                      <span className="ml-2 text-xs text-neutral-400">x{item.quantity}</span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">${item.price * item.quantity}</span>
                    {/* Botón para quitar una unidad */}
                    <button
                      className="btn btn-xs btn-circle btn-error"
                      onClick={() => removeFromCart(item.id)}
                      title="Quitar uno"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <>
              <div className="flex items-center justify-between mt-4 mb-2 font-bold text-white">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
              <a
                className="w-full mt-2 btn btn-success"
                href={`https://wa.me/528119817118?text=${encodeURIComponent(
                  `¡Hola! Quiero comprar:\n\n${cart
                    .map((item, i) => `${i + 1}. ${item.title} x${item.quantity} - $${item.price * item.quantity}`)
                    .join("\n")}\n\nTotal: $${totalPrice}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar por WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
      {/* Fondo para cerrar el drawer */}
      {cartOpen && (
        <div
          className="fixed h-screen inset-0 z-[998] backdrop-blur-sm bg-opacity-30"
          onClick={() => setCartOpen(false)}
        />
      )}
      {/* --- Fin Drawer --- */}
    </nav>
  );
}

/*
Agrega las siguientes animaciones a tu CSS global (index.css o tailwind.config.js):
@keyframes spin-once {
  0% { transform: rotate(0deg); }
  80% { transform: rotate(720deg); }
  100% { transform: rotate(720deg); }
}
.animate-spin-once {
  animation: spin-once 1s cubic-bezier(0.4,0,0.2,1) 1;
}
@keyframes fade-in-logo {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-logo {
  animation: fade-in-logo 0.7s 0.7s both;
}
*/
