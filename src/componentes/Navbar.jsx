import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CarContext";

export default function Navbar() {
  const { cart, removeFromCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

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

  // Calcular total de productos (sumando cantidades)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calcular total $
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <nav
      className={`bg-neutral-950 shadow-md fixed top-0 left-0 w-full h-11.5 z-50 transition-transform duration-300 ${
        hideNav && !cartOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="z-50 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Lorang */}
          <div className="fixed flex items-center flex-shrink-0 left-1 md:left-1 top-1">
            <a href="#" className="flex items-center text-xl font-semibold">
              <img src="/src/pics/logoo.png" alt="logo" className="h-9 w-9" />
              {location.pathname !== "/" && (
                <span className="hidden ml-2 text-lg font-bold tracking-wide text-white sm:inline animate-fade-in " style={{ animation: "fadeInLorang 0.5s cubic-bezier(0.4, 0, 0.2, 1) "}}>
                  Lorang
                </span>
              )}
            </a>
          </div>

          {/* Botón móvil */}
          <div className="flex justify-end w-full md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menú de escritorio */}
          <div className="h-13.5 py-3 hidden md:flex space-x-6 right-6 fixed top-0 items-center">
            <Link
              to="/"
              className="inline-block text-white relative after:block after:h-0.5 after:bg-blue-600 after:scale-x-0
            after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            >
              Inicio
            </Link>
            <Link
              to="/Catalogo"
              className="text-white relative after:block after:h-0.5 after:bg-blue-600 after:scale-x-0
            after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            >
              Productos
            </Link>
            <Link
              to="/Contacto"
              className="text-white relative after:block after:h-0.5 after:bg-blue-600 after:scale-x-0
            after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            >
              Contacto
            </Link>
            <Link 
              to="/Empresa"
              className="text-white relative after:block after:h-0.5 after:bg-blue-600 after:scale-x-0
            after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            >
              Empresa
            </Link>
            {/* --- Botón de carrito de compras --- */}
            <button
              className="relative btn btn-ghost btn-circle"
              onClick={() => setCartOpen(true)}
              aria-label="Carrito"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
                />
              </svg>
              {/* Badge de cantidad */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 badge badge-primary badge-sm">
                  {totalItems}
                </span>
              )}
            </button>
            {/* --- Fin botón carrito --- */}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-sm">
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-md hover:bg-gray-100"
            >
              Inicio
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-md hover:bg-gray-100"
            >
              Productos
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-md hover:bg-gray-100"
            >
              Contacto
            </a>
          </div>
        </div>
      )}

      {/* --- Drawer lateral del carrito --- */}
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
                href={`https://wa.me/528112169211?text=${encodeURIComponent(
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
