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

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

function formatPrice(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return `$${value ?? 0}`;
  return moneyFormatter.format(numeric);
}

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
      <div className="w-full max-w-[92rem] mb-8">
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
      <div className="w-full max-w-[92rem]">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
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
          {!loading && filteredProducts.map((product) => {
            const title = product.title || product.nombre;
            const description = product.description || product.descripcion;
            const category = product.category;
            const categoryLabel = categories.find((c) => c.value === category)?.label || category;
            const price = product.price || product.precio;

            return (
              <article
                key={product.id}
                className="group relative mx-auto flex w-full max-w-[18rem] flex-col overflow-hidden rounded-md border border-slate-300 bg-white transition-all duration-200 hover:border-slate-400"
              >
                {/* Imagen del producto */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={product.image || product.imagen}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Contenido del producto */}
                <div className="flex flex-1 flex-col gap-2.5 p-3 sm:p-4">
                  <h3 className="line-clamp-1 text-sm font-bold text-slate-900 sm:text-base lg:text-lg">
                    {title}
                  </h3>

                  <p className="line-clamp-2 flex-1 text-xs text-slate-600 sm:text-sm">
                    {description}
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">Precio</p>
                      <p className="text-base font-bold text-slate-900 sm:text-lg">{formatPrice(price)}</p>
                    </div>
                    {category && category !== "all" && (
                      <span className="inline-flex items-center border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-600 sm:text-xs">
                        {categoryLabel}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/producto/${product.id}`}
                    className="mt-1 inline-flex w-full items-center justify-center rounded-md border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-800"
                  >
                    Ver detalles
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
