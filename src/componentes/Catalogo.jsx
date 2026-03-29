import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { products as localProducts } from "./productosData";
import ProductSkeleton from "./ProductSkeleton";
import { apiUrl } from "../lib/api";

const categories = [
  { value: "all", label: "Todas" },
  { value: "tablas", label: "Tablas" },
  { value: "rodamientos", label: "Rodamientos" },
  { value: "camisas", label: "Camisas" },
  { value: "stickers", label: "Stickers" },
  // Agrega más si tienes
];

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch(apiUrl('/api/products'));
        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            setProducts(localProducts);
          }
        }
      } catch (err) {
        console.error("Error al cargar productos API, usando fallback local:", err);
        if (isMounted) setProducts(localProducts);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtro por búsqueda y categoría
  const filteredProducts = products.filter((product) => {
    const nombre = product.title || product.nombre || "";
    const descripcion = product.description || product.descripcion || "";
    const categoria = product.category || "all";

    return (
      (category === "all" || categoria === category) &&
      (nombre.toLowerCase().includes(search.toLowerCase()) ||
        descripcion.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <section className="flex flex-col items-center w-full min-h-screen bg-gray-50 text-gray-900 pt-18 pb-16 px-4">
      {/* Header del catálogo */}
  

      {/* Barra de búsqueda y filtros */}
      <div className="w-full max-w-7xl mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {/* Búsqueda */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Buscar producto
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre o descripción..."
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categoría */}
          <div className="w-full md:w-64">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
              Cargando productos...
            </span>
          ) : (
            <>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </>
          )}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Skeletons mientras carga */}
          {loading && (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={`skeleton-${i}`} />
              ))}
            </>
          )}

          {/* Mensaje de vacío (solo cuando no hay carga) */}
          {!loading && filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-xl text-gray-700">No se encontraron productos</p>
              <p className="text-sm text-gray-500 mt-2">Intenta cambiar los filtros de búsqueda</p>
            </div>
          )}
          {!loading && filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              {/* Imagen del producto */}
              <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.image || product.imagen}
                  alt={product.title || product.nombre}
                  loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge de precio */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
                  ${product.price || product.precio}
                </div>
                {/* Overlay en hover */}
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              {/* Contenido del producto */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.title || product.nombre}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 flex-1">
                  {product.description || product.descripcion}
                </p>
                
                {/* Categoría badge */}
                {product.category && product.category !== 'all' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 w-fit">
                    {categories.find(c => c.value === product.category)?.label || product.category}
                  </span>
                )}

                {/* Botón */}
                <Link
                  to={`/producto/${product.id}`}
                  className="mt-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 text-center hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
