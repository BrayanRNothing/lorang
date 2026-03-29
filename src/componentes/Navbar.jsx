import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CarContext";
import { useToast } from "./Toast";
import logoo from "../pics/logoo.png";

export default function Navbar() {
  const { cart, removeFromCart, addToCart, removeAllFromCart, clearCart } = useCart();
  const { addToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Línea 15
  const location = useLocation();
  // Estado para controlar la animación del logo
  const [logoSpin, setLogoSpin] = useState(false);
  // Estado para el blur
  const [hasBlur, setHasBlur] = useState(false);

  // Usar Intersection Observer para detectar cuando sales de la primera sección (solo en Inicio)
  useEffect(() => {
    // Si NO estamos en inicio, siempre blur
    if (location.pathname !== '/') {
      setHasBlur(true);
      return;
    }

    // En inicio, usar Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si la primera sección NO está visible, activar blur
        setHasBlur(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    const firstSection = document.querySelector('section');
    if (firstSection) {
      observer.observe(firstSection);
    }

    return () => {
      if (firstSection) {
        observer.unobserve(firstSection);
      }
    };
  }, [location.pathname]);

  // Mostrar siempre el navbar cuando el carrito está abierto
  useEffect(() => {
    // Código si es necesario para el carrito
  }, [cartOpen]);

  // Efecto para girar el logo cada vez que cambia la ruta
  useEffect(() => {
    setLogoSpin(true);
    const timeout = setTimeout(() => setLogoSpin(false), 1000); // Duración igual a la animación
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // Calcular total de productos (sumando cantidades)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calcular total $
  const totalPrice = cart.reduce((acc, item) => acc + (item.price || item.precio) * item.quantity, 0);

  const isLightPage =
    location.pathname === '/' ||
    location.pathname.startsWith('/Catalogo') ||
    location.pathname.startsWith('/Noticias') ||
    location.pathname.startsWith('/producto') ||
    location.pathname.startsWith('/Contacto');
  const navLinkClass = isLightPage && hasBlur
    ? "text-gray-800 text-lg hover:text-blue-600 transition-colors duration-200 font-medium"
    : "text-white text-lg hover:text-gray-300 transition-colors duration-200";
  const logoTextClass = isLightPage && hasBlur
    ? "ml-2 text-lg font-bold tracking-wide text-gray-900 animate-fade-in-logo"
    : "ml-2 text-lg font-bold tracking-wide text-white animate-fade-in-logo";
  const desktopCartIconClass = isLightPage && hasBlur ? "w-6 h-6 text-gray-800" : "w-6 h-6 text-white";
  const mobileButtonClass = isLightPage && hasBlur ? "p-2 mr-2 text-gray-800 rounded focus:outline-none" : "p-2 mr-2 text-white rounded focus:outline-none";
  const mobileCartIconClass = isLightPage && hasBlur ? "text-gray-800 w-7 h-7" : "text-white w-7 h-7";
  const mobileMenuLinkClass = isLightPage && hasBlur
    ? "py-2 text-gray-800 rounded hover:bg-blue-50"
    : "py-2 text-white rounded hover:bg-white/10";

  return (
    <>
    <nav 
      className="w-full overflow-hidden fixed top-0 left-0 z-[100] transition-all duration-500"
      style={{
        backgroundColor: hasBlur ? (isLightPage ? 'rgba(255, 255, 255, 0.75)' : 'rgba(10, 10, 10, 0.7)') : 'transparent',
        backdropFilter: hasBlur ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: hasBlur ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: hasBlur ? (isLightPage ? '1px solid rgba(229, 231, 235, 0.7)' : '1px solid rgba(255, 255, 255, 0.1)') : '1px solid transparent',
        boxShadow: hasBlur ? (isLightPage ? '0 8px 32px rgba(0, 0, 0, 0.08)' : '0 8px 32px rgba(0, 0, 0, 0.4)') : 'none'
      }}
    >
      <div className="flex items-center h-11.5 w-full overflow-hidden">
        {/* Logo + Lorang alineado a la izquierda */}
        <div className="flex items-center flex-shrink-0 overflow-hidden">
          <a href="/" className="flex items-center text-xl font-semibold overflow-hidden">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <img
                src={logoo}
                alt="logo"
                className={`object-contain w-10 h-10 transition-transform duration-700 ease-out ${logoSpin ? 'animate-spin-once' : ''}`}
                style={{ animationDelay: '0.2s' }}
              />
            </div>
            <span className={logoTextClass} style={{ animationDelay: '0.7s' }}>
              Lorang
            </span>
          </a>
        </div>
        {/* Menú PC (oculto en móvil) */}
        <div className="justify-end flex-1 hidden m-5 md:flex">
          <div className="flex items-center space-x-6">
            <Link to="/" className={navLinkClass}>Inicio</Link>
            <Link to="/Catalogo" className={navLinkClass}>Productos</Link>
            <Link to="/Noticias" className={navLinkClass}>Noticias</Link>
            <Link to="/Contacto" className={navLinkClass}>Contacto</Link>
            <button className="relative" onClick={() => setCartOpen(true)} aria-label="Carrito">
              <svg xmlns="http://www.w3.org/2000/svg" className={desktopCartIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex min-w-[1.15rem] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold leading-none text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Menú móvil: hamburguesa y carrito */}
        <div className="flex items-center justify-end flex-1 m-2 md:hidden">
          <button
            className={mobileButtonClass}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {/* Icono hamburguesa */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="relative" onClick={() => setCartOpen(true)} aria-label="Carrito">
            <svg xmlns="http://www.w3.org/2000/svg" className={mobileCartIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex min-w-[1.15rem] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold leading-none text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Menú desplegable móvil */}
        <div
          className={`flex flex-row items-center justify-center w-full gap-4 px-4 py-0 border-b bg-transparent border-blue-100 md:hidden transition-all duration-300
        ${mobileMenuOpen ? 'animate-slide-down opacity-100 pointer-events-auto' : 'animate-slide-up opacity-0 pointer-events-none'}`}
        style={{height: mobileMenuOpen ? 'auto' : 0, overflow: 'hidden'}}
        >
          <Link to="/" className={mobileMenuLinkClass} onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
          <Link to="/Catalogo" className={mobileMenuLinkClass} onClick={() => setMobileMenuOpen(false)}>Productos</Link>
          <Link to="/Noticias" className={mobileMenuLinkClass} onClick={() => setMobileMenuOpen(false)}>Noticias</Link>
          <Link to="/Contacto" className={mobileMenuLinkClass} onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
        </div>
      </nav>
      
      {/* Drawer lateral del carrito - FUERA del nav */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[9999] transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <h2 className="text-xl text-slate-900 font-bold">Carrito</h2>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4 bg-white">
          {cart.length === 0 ? (
            <p className="text-slate-500">No hay productos en el carrito.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex text-slate-800 items-center justify-between pb-2 border-b border-slate-200"
                >
                  <span>
                    {item.title || item.nombre}
                    {item.quantity > 1 && (
                      <span className="ml-2 text-xs text-slate-500">x{item.quantity}</span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100"
                      onClick={() => removeFromCart(item.id)}
                      title="Quitar uno"
                    >
                      −
                    </button>
                    <span className="px-1.5 text-base font-bold text-slate-900">{item.quantity}</span>
                    <button
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100"
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      title="Agregar uno"
                    >
                      +
                    </button>
                    <span className="font-bold text-blue-700">${(item.price || item.precio) * item.quantity}</span>
                    {/* Botón para quitar todos */}
                    <button
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100"
                      onClick={() => {
                        removeAllFromCart(item.id);
                        addToast(`${item.title || item.nombre} eliminado del carrito`, 'info');
                      }}
                      title="Quitar todos"
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
              <div className="flex items-center justify-between mt-4 mb-2 font-bold text-slate-900">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
              <a
                className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2.5 font-semibold text-white transition-all hover:from-blue-700 hover:to-cyan-700"
                href={`https://wa.me/528119817118?text=${encodeURIComponent(
                  `¡Hola! Quiero comprar:\n\n${cart
                    .map((item, i) => `${i + 1}. ${(item.title || item.nombre)} x${item.quantity} - $${(item.price || item.precio) * item.quantity}`)
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
          className="fixed h-screen inset-0 z-[9998] backdrop-blur-sm bg-slate-900/20"
          onClick={() => setCartOpen(false)}
        />
      )}
      {/* --- Fin Drawer --- */}
    </>
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