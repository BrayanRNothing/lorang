import { Link } from "react-router-dom";
import { products } from "./productosData";
import { useState } from "react";

const categories = [
  { value: "all", label: "Todas" },
  { value: "tablas", label: "Tablas" },
  { value: "rodamientos", label: "Rodamientos" },
  { value: "camisas", label: "Camisas" },
  { value: "stickers", label: "Stickers" },
  // Agrega más si tienes
];

export default function Catalogo() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Filtro por búsqueda y categoría
  const filteredProducts = products.filter(
    (product) =>
      (category === "all" || product.category === category) &&
      (
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <section className="min-h-screen px-2 py-8 bg-neutral-950">
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col mx-auto mb-8 gap-7 max-w-7xl md:flex-row md:items-end">
        <div className="flex-1">
          <label className="block mb-2 text-lg font-semibold text-white">
           {/*texto no definido */}
          </label>
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            className="w-full text-white input input-bordered bg-neutral-900 border-neutral-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-74">
          <label className="block mb-2 text-lg font-semibold text-white">
            {/*texto no definido */}
          </label>
          <select
            className="w-full text-white select select-bordered bg-neutral-900 border-neutral-700"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 gap-3 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center col-span-full text-neutral-400">
            No se encontraron productos.
          </div>
        )}
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col overflow-hidden transition-colors border shadow-lg group bg-neutral-900 border-neutral-800 hover:border-blue-500 rounded-lg min-h-[200px] max-w-[180px] mx-auto
            md:min-h-[270px] md:max-w-none md:p-0 md:rounded-xl"
          >
            <div className="relative w-full aspect-[4/3] bg-neutral-800 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-full"
              />
              <span className="absolute px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded shadow top-2 right-2 md:px-3 md:py-1 md:text-sm">
                ${product.price}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-1 p-2 md:gap-2 md:p-4">
              <h2 className="text-xs font-bold text-white truncate md:text-lg">{product.title}</h2>
              <p className="text-[10px] text-neutral-400 line-clamp-2 md:text-sm">{product.description}</p>
              <div className="flex gap-1 mt-auto md:gap-2">
                <Link
                  to={`/producto/${product.id}`}
                  className="flex-1 btn btn-primary btn-xs md:btn-sm"
                >
                  Ver Más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}