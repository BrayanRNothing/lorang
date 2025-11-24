export default function ProductSkeleton() {
	return (
		<div className="group relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl animate-pulse">
			{/* Imagen placeholder */}
			<div className="relative w-full aspect-square bg-gray-200" />

			{/* Contenido placeholder */}
			<div className="flex flex-col flex-1 p-5 gap-3">
				{/* Título */}
				<div className="h-4 w-3/4 bg-gray-200 rounded" />
				{/* Descripción líneas */}
				<div className="space-y-2">
					<div className="h-3 w-full bg-gray-200 rounded" />
					<div className="h-3 w-5/6 bg-gray-200 rounded" />
				</div>
				{/* Chip categoría */}
				<div className="h-5 w-24 bg-gray-200 rounded-full mt-1" />
				{/* Botón */}
				<div className="mt-auto h-10 w-full bg-gray-200 rounded-lg" />
			</div>
			<span className="sr-only">Cargando producto…</span>
		</div>
	);
}

