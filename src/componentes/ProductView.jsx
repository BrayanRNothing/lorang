import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CarContext";
import { products } from "./productosData";

export default function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = products.find((p) => p.id === Number(id));
    const cuotas = Math.ceil(product?.price / 6);
    const stock = 12; // puedes cambiarlo por producto.stock si lo tienes

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
                <h2 className="mb-4 text-2xl font-bold">Producto no encontrado</h2>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>
                    Volver
                </button>
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center min-h-screen px-2 py-10 bg-neutral-950">
            <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                {/* Columna 1: Imagen */}
                <div className="flex flex-col items-center md:items-start">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain w-full max-w max-h-[420px] rounded-md shadow-lg bg-neutral-900 border border-neutral-800 "
                    />
                    <div className="flex flex-row w-full max-w-[370px] gap-2 mt-6">
                        <span className="text-xs text-neutral-400">
                             Código: <span className="text-neutral-200">{product.id}</span>
                        </span>
                        <span className="text-xs text-neutral-400">
                            Categoría: <span className="text-blue-400 uppercase">{product.category}</span>
                        </span>
                    </div>
                </div>
                {/* Columna 2: Nombre, descripción y precio */}
                <div className="flex flex-col items-start justify-start w-full h-full ">
                    <h1 className="mb-3 text-3xl font-extrabold text-white">{product.title}</h1>
                    <div className="mb-4 ">
                        <span className="text-4xl font-extrabold text-green-500">${product.price}</span>
                        <span className="ml-2 text-base text-neutral-400 align-super">
                            o 6x <span className="font-bold text-green-400">${cuotas}</span> sin interés
                        </span>
                    </div>
                    <div className="w-full mb-6 h-1/2">
                        <p className="text-base text-neutral-300">{product.description}</p>
                        <p className="mt-2 text-sm text-neutral-400">{product.details}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-3 mb-2">
                        <span className="text-xs font-semibold text-blue-400">Garantía en compras</span>
                        <span className="text-xs text-neutral-500">| Compra protegida</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2 ">
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-neutral-800 text-neutral-300">Nuevo</span>
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-neutral-800 text-neutral-300">Devolución gratis</span>
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-neutral-800 text-neutral-300">Garantía oficial</span>
                    </div>
                </div>
                {/* Columna 3: Stock, envío, botones y más info */}
                <div className="flex flex-col items-start w-full max-w-xs gap-6 mx-auto md:mx-0">
                    <div className="mt-3">
                        <span className={`text-base font-semibold ${stock > 0 ? "text-green-500" : "text-red-500"}`}>
                            {stock > 0 ? `Stock disponible (${stock})` : "Sin stock"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">
                            <svg className="inline w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold text-green-400">Envío gratis</span>
                        <span className="text-xs text-neutral-400">(a todo Nuevo Leon)</span>
                    </div>
                    <div>
                        <span className="text-xs text-neutral-400">Recíbelo entre <span className="font-semibold text-white">2 y 5 días</span></span>
                    </div>
                    <div>
                        <span className="text-xs text-neutral-400">Métodos de pago:</span>
                        <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs rounded bg-neutral-800 text-neutral-200">Tarjeta</span>
                            <span className="px-2 py-1 text-xs rounded bg-neutral-800 text-neutral-200">OXXO</span>
                            <span className="px-2 py-1 text-xs rounded bg-neutral-800 text-neutral-200">Transferencia</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-3 mt-5">
                        <button 
                            className="w-full btn btn-secondary btn-lg"
                            onClick={() => {
                                const msg = `¡Hola! Quiero comprar:\n\n1. ${product.title} x1 - $${product.price}\n\nTotal: $${product.price}`;
                                window.open(`https://wa.me/528119817118?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                        >
                        Comprar
                        </button>

                        <button
                            className="w-full font-bold btn btn-primary btn-lg"
                            onClick={() => addToCart(product)}
                            disabled={stock === 0}
                        >
                            {stock === 0 ? "Sin stock" : "Agregar al carrito"}
                        </button>
                        <button
                            className="w-full btn btn-outline btn-lg"
                            onClick={() => navigate(-1)}
                        >
                            Volver al catálogo
                        </button>
                    </div>
                    
                </div>
            </div>
            {/* Descripción extendida */}
            <div className="w-full max-w-6xl px-2 mt-14 md:px-0">
                <h2 className="mb-4 text-2xl font-bold text-white">Descripción del producto</h2>
                <p className="mb-2 text-base text-neutral-300">{product.description}</p>
                <p className="text-sm text-neutral-400">{product.details}</p>
            </div>
            {/* Seguridad y atención */}
            <div className="flex flex-col w-full max-w-6xl gap-4 px-2 mt-10 md:flex-row md:px-0">
                <div className="flex items-center flex-1 gap-3 p-4 border rounded-lg bg-neutral-900 border-neutral-800">
                    <span className="text-green-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                    <span className="text-sm text-neutral-300">Compra protegida con Mercado Pago o Transacciones</span>
                </div>
                <div className="flex items-center flex-1 gap-3 p-4 border rounded-lg bg-neutral-900 border-neutral-800">
                    <span className="text-blue-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </span>
                    <span className="text-sm text-neutral-300">Soporte y atención personalizada</span>
                </div>
            </div>
        </section>
    );
}